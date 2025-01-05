import { Component } from '@angular/core';
import { RoomServiceService } from './services/room-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project';
  constructor(private roomService: RoomServiceService) {}
}
