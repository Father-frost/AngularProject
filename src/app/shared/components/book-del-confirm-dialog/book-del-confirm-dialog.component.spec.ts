import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDelConfirmDialogComponent } from './book-del-confirm-dialog.component';

describe('BookDelConfirmDialogComponent', () => {
  let component: BookDelConfirmDialogComponent;
  let fixture: ComponentFixture<BookDelConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDelConfirmDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookDelConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
