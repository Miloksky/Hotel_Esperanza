export interface IRoom {
  id: number;
  number: string;
  type: string;
  description: string;
  price: string;    
  available: boolean; 
  capacity: number;
}