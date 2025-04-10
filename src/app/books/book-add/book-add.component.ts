import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../material/material.module';
import { Router } from '@angular/router';
import { Author, Book, Category } from '../../models/models';
import { DataService } from '../../shared/services/data.service';

export interface CategoryOption {
  displayValue: string;
  value: number;
}

export interface AuthorOption {
  displayValue: string;
  value: number;
}

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrl: './book-add.component.scss',
  imports: [MaterialModule, MaterialModule, ReactiveFormsModule]
})
export class BookAddComponent {
  newBook: FormGroup;
  categoryOptions: CategoryOption[] = [];
  authorOptions: AuthorOption[] = [];
  

  constructor(
    fb: FormBuilder,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {

    this.newBook = fb.group({
      title: fb.control('', [Validators.required]),
      author: fb.control('', [Validators.required]),
      PubYear: fb.control('', [Validators.required]),
      category: fb.control(-1, [Validators.required]),
      description: fb.control(''),
      imgPath: fb.control(''),
    });

    dataService.getCategories().subscribe({
      next: (res: Category[]) => {
        res.forEach((c) => {
          this.categoryOptions.push({
            value: c.id,
            displayValue: `${c.name}`,
          });
        });
      },
    });

    dataService.getAuthors().subscribe({
      next: (res: Author[]) => {
        res.forEach((c) => {
          this.authorOptions.push({
            value: c.id,
            displayValue: `${c.name}`,
          });
        });
      },
    });

  }

  addBook() {
    let book: Book = {
      id: 0,
      title: this.newBook.get('title')?.value,
      authorId: this.newBook.get('author')?.value,
      categoryId: this.newBook.get('category')?.value,
      pubYear: this.newBook.get('pubYear')?.value,
      imgPath: this.newBook.get('imgPath')?.value,
      description: this.newBook.get('description')?.value, 
    };

    console.log(book)
    this.dataService.postBook(book)
      .subscribe({
        next: data => {
          console.log(data);
          this.snackBar.open('Book Added!', 'Success ');
          this.router.navigate(['/']);  
        },
        error: (error) => {
          console.log(error);
          this.snackBar.open('Error adding book!', 'Error ');
        }
    })
  }

}
