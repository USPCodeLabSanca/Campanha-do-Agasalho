import { ObjectId } from "mongodb";

export interface ICampaignEvent {
  _id?: ObjectId;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  beneficiaryEntity?: string;
  raisedAmount?: number;
  images?: string[];
  isFinished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}