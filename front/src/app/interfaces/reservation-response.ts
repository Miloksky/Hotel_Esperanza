import { IRoom } from "./room.interface";

export interface IReservationResponse {
    success: boolean;
    msg: string;
}

export interface IReservation {
  id: number;
  rooms: IRoom[];
  selectedResources: { [key: number]: number | null };
  checkInDate: string;
  checkOutDate: string;
  guests: number;
}