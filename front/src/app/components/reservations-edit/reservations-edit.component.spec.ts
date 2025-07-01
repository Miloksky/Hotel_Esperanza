import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsEditComponent } from './reservations-edit.component';

describe('ReservationsEditComponent', () => {
  let component: ReservationsEditComponent;
  let fixture: ComponentFixture<ReservationsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationsEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
