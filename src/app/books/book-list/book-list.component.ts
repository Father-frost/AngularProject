import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { BookCardComponent } from "../../shared/components/book-card/book-card.component";
import { BookAddComponent } from '../book-add/book-add.component';
import { Book, Category } from '../../models/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../shared/services/data.service';
import { MaterialModule } from '../../material/material.module';
import { Router } from '@angular/router';
import { UiService } from '../../shared/services/ui.service';
import { EmptyBookshelfComponent } from '../../shared/components/empty-bookshelf/empty-bookshelf.component';
import { NgFor, NgIf } from '@angular/common';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { PageToolboxComponent } from '../../shared/components/page-toolbox/page-toolbox.component';

@Component({
  selector: 'app-book-list',
  imports: [BookCardComponent, BookAddComponent, EmptyBookshelfComponent, NgFor,NgIf, MaterialModule, PageToolboxComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  books: Book[] = [];
  bookToDelete!: Book;
  dialogRef: any;
  

  constructor(    
    private dataService: DataService,
    private uiService: UiService,
  ) { }

  ngOnInit(): void {
    this.uiService.showSearchBar(true);
    this.dataService.getAllFromApi();
    this.dataService.getSubject()
    .subscribe(data => { this.books = data });


  }

  ngOnDestroy(): void {
    this.uiService.showSearchBar(false);
  }

    // delete modal functions
    deleteBook(book: Book, modalTemplate: TemplateRef<any>): void {
      this.bookToDelete = book;
      this.dialogRef = this.dialog.open(modalTemplate);

    }
  
    confirmDelete(): void {
      this.dataService.deleteFromApi(this.bookToDelete);
  
      //this.modalRef?.hide();
    }
   
    declineDelete(): void {
      //this.modalRef?.hide();
    }
}

