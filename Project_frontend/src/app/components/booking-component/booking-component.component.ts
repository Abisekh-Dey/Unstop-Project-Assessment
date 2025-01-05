import { Component } from '@angular/core';
import { BookingServiceService } from '../../services/booking-service.service';
import { Booking } from '../../models/booking_model';

@Component({
  selector: 'app-booking-component',
  templateUrl: './booking-component.component.html',
  styleUrl: './booking-component.component.css'
})
export class BookingComponentComponent {
  guestName: string = '';
  numRooms: number = 1;
  message: string = '';
  status:boolean=false;

  constructor(private bookingService: BookingServiceService) {}

  bookRooms(): void {
    this.bookingService.bookRooms(this.guestName, this.numRooms).subscribe({
      next: (data: any) => {
        const totalTravelTime = data.booking?.totalTravelTime;
        this.message = `Booking successful! Total travel time: ${totalTravelTime} mins.`;
        this.status=true;
      },
      error: (err) => {
        this.message = `Error: ${err.error.error}`;
        console.error(`Booking failed: ${err.error.error}`);
      }
    });
  }
  
}
