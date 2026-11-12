// usar react-leaflet (biblioteca open-source para visualização de mapas e pontos com informações e pop-up)

import { ObjectId } from "mongodb";

// Interface dos elementos da coleção CollectPoints
export interface ICollectPoint {
  _id?: ObjectId;
  name: string;
  neighborhood: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  operatingHours?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}