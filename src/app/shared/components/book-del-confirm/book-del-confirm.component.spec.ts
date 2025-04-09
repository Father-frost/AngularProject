import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDelConfirmComponent } from './book-del-confirm.component';

describe('BookDelConfirmComponent', () => {
  let component: BookDelConfirmComponent;
  let fixture: ComponentFixture<BookDelConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDelConfirmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookDelConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
