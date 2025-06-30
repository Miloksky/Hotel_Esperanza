import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomManagementComponent } from './room-management.component';

describe('RoomManagementComponent', () => {
  let component: RoomManagementComponent;
  let fixture: ComponentFixture<RoomManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
