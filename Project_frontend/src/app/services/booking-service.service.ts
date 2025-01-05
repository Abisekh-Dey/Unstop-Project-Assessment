import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking_model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {
  // private apiUrl = 'http://localhost:5000/api/bookings'; 
  private apiUrl=`${environment.apiUrl}/api/bookings`

  constructor(private http: HttpClient) {}

  bookRooms(guestName: string, numRooms: number): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}/book`, { guestName, numRooms });
  }
  deleteBookings(): Observable<{booking:Booking,message:String}> {
    return this.http.delete<{booking:Booking,message:String}>(`${this.apiUrl}/deleteBooking`);
  }
}
