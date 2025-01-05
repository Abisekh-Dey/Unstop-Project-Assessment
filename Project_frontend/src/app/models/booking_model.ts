import { Room } from './room_model';
export class Booking {
  constructor(
    public guestName: string, 
    public rooms: Room[], 
    public totalTravelTime: number, 
    public bookingDate?: Date, 
    public _id?: string, 
  ){}
  }
  