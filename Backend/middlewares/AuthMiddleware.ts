import type { Request, Response, NextFunction } from "express";
import { ErrorCode } from "../constants/ErrorCode.js";
import jwt from "jsonwebtoken"

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({
            code: ErrorCode.UNAUTHORIZED,
            message: "Token não encontrado",
            status: 401
        })
    }

    try {
        const secret = String(process.env.JWT_SECRET);
        const decoded = jwt.verify(token, secret);
        (req as any).user = decoded; 
        return next();
    } catch(error) {
        if(error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                code: ErrorCode.UNAUTHORIZED,
                message: "Token expirado",
                status: 401
            })
        }

        if(error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                code: ErrorCode.UNAUTHORIZED,
                message: "Token inválido",
                status: 401
            })
        }

        console.error("[AUTHMIDDLEWARE]: ", error);

        return res.status(500).json({
            code: ErrorCode.INTERNAL_SERVER_ERROR,
            message: "Ocorreu um erro interno",
            status: 500
        })
    }
}