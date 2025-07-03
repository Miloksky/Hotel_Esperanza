export interface IRoom {
  id: number;
  number: string;
  type: string;
  description: string;
  price: number;    
  available: boolean; 
  capacity: number;
}