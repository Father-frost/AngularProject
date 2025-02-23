import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcResultOutputComponent } from './calc-result-output.component';

describe('CalcResultOutputComponent', () => {
  let component: CalcResultOutputComponent;
  let fixture: ComponentFixture<CalcResultOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalcResultOutputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalcResultOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
