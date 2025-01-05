import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../models/room_model';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RoomServiceService {
  // private apiUrl = 'http://localhost:5000/api/rooms';
  private apiUrl=`${environment.apiUrl}/api/rooms`

  constructor(private http: HttpClient) {}

  generateRooms(): Observable<any> {
    return this.http.post(`${this.apiUrl}/generate`, {});
  }

  getRooms(): Observable<{rooms:Room[],bookedCount:any,availableCount:any}> {
    return this.http.get<{rooms:Room[],bookedCount:any,availableCount:any}>(this.apiUrl);
  }

  generateRandomOccupancy(): Observable<any> {
    return this.http.put(`${this.apiUrl}/random`, {});
  }
  

  resetBookings(): Observable<any> {
    return this.http.put(`${this.apiUrl}/reset`, {});
  }
}
