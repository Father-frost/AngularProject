import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { Book, Category } from '../../../models/models';


@Component({
  selector: 'app-book-card',
  imports: [ MaterialModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent  {
  @Input() book!: Book;
  @Output() deleteEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log(this.book);
  }

  onDelete(book: Book): void {
    this.deleteEvent.emit(book);
  } 
}
