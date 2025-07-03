export interface IRoom {
  id: number;
  number: string;
  type: string;
  description: string;
  price: number;    
  available: boolean; 
  capacity: number;
  resource_name?: string;   
  resource_price?: number | string; 
  subtotal?: number | string;
  resource_id?: number | string;
  room_number?: number | string;
}