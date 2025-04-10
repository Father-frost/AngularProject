import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { Book } from '../../../models/models';


@Component({
  selector: 'app-book-card',
  imports: [ MaterialModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent implements OnInit {
  @Input() book!: Book;
  @Output() deleteEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    //console.log(this.book);
  }

  onDelete(book: Book): void {
    console.log(this.book);
    this.deleteEvent.emit(book);
  } 
}
