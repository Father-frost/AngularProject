import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageToolboxComponent } from './page-toolbox.component';

describe('PageToolboxComponent', () => {
  let component: PageToolboxComponent;
  let fixture: ComponentFixture<PageToolboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageToolboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
