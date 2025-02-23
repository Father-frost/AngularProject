import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcBtnComponent } from './calc-btn.component';

describe('CalcBtnComponent', () => {
  let component: CalcBtnComponent;
  let fixture: ComponentFixture<CalcBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalcBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalcBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
