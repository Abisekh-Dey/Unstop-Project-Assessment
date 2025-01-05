import { Component, OnInit } from '@angular/core';
import { RoomServiceService } from '../../services/room-service.service';
import { BookingServiceService } from '../../services/booking-service.service';
import { Room } from '../../models/room_model';

@Component({
  selector: 'app-room-component',
  templateUrl: './room-component.component.html',
  styleUrls: ['./room-component.component.css']
})
export class RoomComponentComponent implements OnInit {
  floors: { rooms: Room[] }[] = [];
  reversedFloors: { rooms: Room[] }[] = [];
  status:boolean=false;
  updated:number=0;
  booked:Number=0;
  initialRoomNumber:boolean=false;
  noBookingsMessage:string=""

  constructor(private roomService: RoomServiceService,private bookingService: BookingServiceService) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.roomService.getRooms().subscribe({
      next: (res) => {
        const { rooms, bookedCount, availableCount } = res;
        const maxFloors = 10;
        for (let floorNumber = 1; floorNumber <= maxFloors; floorNumber++) {
          this.floors.push({
            rooms: rooms.filter((room) => room.floor === floorNumber)
          });
        }

        this.reversedFloors = [...this.floors].reverse();

        this.updated=availableCount;
        this.booked=bookedCount;
      },
      error: (err) => console.error('Error loading rooms:', err)
    });
  }

  getTotalRooms(): number {
    return this.reversedFloors.reduce((total, floor) => total + floor.rooms.length, 0);
  }
  

  generateRooms(): void {
    this.roomService.generateRooms().subscribe({
      next: () => alert('Rooms generated successfully!'),
      error: (err) => console.error('Error generating rooms:', err)
    });
  }

  resetRooms(): void {
    this.roomService.resetBookings().subscribe({
      next: () => {
        console.log("All bookings Reset successfully!");
        // this.status=true;
        this.reset(); 
      },
      error: (err) => console.log("Error reseting rooms:",err)
    });
  }

  generateRandomOccupancy() {
    this.roomService.generateRandomOccupancy().subscribe({
      next: (res) => {
        this.initialRoomNumber=true;
        console.log(res);
        this.reset(); 
      },
      error: () => console.log('Failed to generate random occupancy.')
    });
  }

  deletebookings():void{
    this.bookingService.deleteBookings().subscribe({
      next: (response) => {
        console.log(response.message);
        this.status = response.message.includes('Deleted');
        this.roomService.resetBookings().subscribe({
          next: () => {
            console.log("All bookings Reset successfully!");
            // this.reset(); 
          },
          error: (err) => console.log("Error reseting rooms:",err)
        });
      },
      error: (err) => {
        console.log(err.error.message); 
        this.status = false; 
        this.noBookingsMessage = err.error.message; 
      }
    });
    
  }

  reset():void{
    this.status=false;
    this.floors=[];
    this.reversedFloors=[];
    this.ngOnInit();
  }

  changeMessage():void{
    this.noBookingsMessage=""
  }
}
