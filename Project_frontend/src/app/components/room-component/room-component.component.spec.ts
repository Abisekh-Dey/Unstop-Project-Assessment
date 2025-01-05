import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomComponentComponent } from './room-component.component';

describe('RoomComponentComponent', () => {
  let component: RoomComponentComponent;
  let fixture: ComponentFixture<RoomComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
