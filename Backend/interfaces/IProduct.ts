import { ObjectId } from "mongodb";

// Interface dos elementos da coleção Products
export interface ICampaignProduct {
  _id?: ObjectId;
  name: string;           
  description: string;      
  price?: number;  
  images: string[];   
  purchaseInstructions: string;  
  isAvailable: boolean;  
  createdAt?: Date;
  updatedAt?: Date;
}