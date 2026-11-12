import { ObjectId } from "mongodb"

// Interface dos elementos da coleção Year
export interface IYear {
  _id?: ObjectId;
  year: number;
  totalCollected: number;
  totalCollectionPoints: number;
  totalBeneficiaryEntities: number;
  totalRaisedMoney?: number;
  createdAt?: Date;
  updatedAt?: Date;
}