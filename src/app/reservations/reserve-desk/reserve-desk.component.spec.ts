import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveDeskComponent } from './reserve-desk.component';

describe('ReserveDeskComponent', () => {
  let component: ReserveDeskComponent;
  let fixture: ComponentFixture<ReserveDeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveDeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
