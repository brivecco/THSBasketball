import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSubComponent } from './player-sub.component';

describe('PlayerSubComponent', () => {
  let component: PlayerSubComponent;
  let fixture: ComponentFixture<PlayerSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerSubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
