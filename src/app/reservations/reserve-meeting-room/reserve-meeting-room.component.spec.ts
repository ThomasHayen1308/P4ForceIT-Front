import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveMeetingRoomComponent } from './reserve-meeting-room.component';

describe('ReserveMeetingRoomComponent', () => {
  let component: ReserveMeetingRoomComponent;
  let fixture: ComponentFixture<ReserveMeetingRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveMeetingRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveMeetingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
