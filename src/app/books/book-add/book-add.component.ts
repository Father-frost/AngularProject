import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Book, Category } from '../../models/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../shared/services/data.service';
import { MaterialModule } from '../../material/material.module';
import { Router } from '@angular/router';

export interface CategoryOption {
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
  newCategory: FormGroup;
  newBook: FormGroup;
  deleteBook: FormControl;
  categoryOptions: CategoryOption[] = [];
  

  constructor(
    fb: FormBuilder,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.newCategory = fb.group({
      category: fb.control('', [Validators.required]),
    });

    this.newBook = fb.group({
      title: fb.control('', [Validators.required]),
      author: fb.control('', [Validators.required]),
      year: fb.control('', [Validators.required]),
      category: fb.control(-1, [Validators.required]),
      description: fb.control('')
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

    this.deleteBook = fb.control('', [Validators.required]);
  }

  addBook() {
    let book: Book = {
      id: 0,
      title: this.newBook.get('title')?.value,
      authorId: this.newBook.get('author')?.value,
      categoryId: this.newBook.get('category')?.value,
      year: this.newBook.get('year')?.value,
      category: { id: 0, name: ''},
      author: { id: 0, name: ''},
      description: "", 
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
