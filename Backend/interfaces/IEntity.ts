import { ObjectId } from "mongodb";

// Interface dos elementos da coleção Entity
export interface IEntity {
  _id?: ObjectId;
  name: string;         
  location: string;   
  targetAudience: string; 
  description: string;  
  campaignContribution: string; 
  photos?: string[];
  contactInfo?: {
    phone?: string;
    address?: string;
    socialMedia?: string;
  };
  isActive: boolean; 
  createdAt?: Date;
  updatedAt?: Date;
}