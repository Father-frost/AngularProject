import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Book, Author, Category } from '../../models/models';
import { DataService } from '../../shared/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../material/material.module';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

export interface CategoryOption {
  displayValue: string;
  value: number;
}

export interface AuthorOption {
  displayValue: string;
  value: number;
}

@Component({
  selector: 'app-book-edit',
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.scss'
})
export class BookEditComponent implements OnInit {
  editedBook: FormGroup;
  categoryOptions: CategoryOption[] = [];
  authorOptions: AuthorOption[] = [];

  book: Book = {
    id: 0,
    title: "",
    categoryId: 0,    
    description: "",   
    authorId: 0,
    pubYear: ""
  }
  
  constructor(
    fb: FormBuilder,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.editedBook = fb.group({
      title: fb.control('', [Validators.required]),
      author: fb.control('', [Validators.required]),
      pubYear: fb.control('', [Validators.required]),
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

  ngOnInit(): void {    
    this.route.params.subscribe(params => {
      const id = params["id"];

      if(!id)  
        this.router.navigate(['']);

      this.dataService.findBookById(id)
        .subscribe(book => {
          if(book){
            this.book = book;

          } else {
            this.snackBar.open("Book not found!", "Error");
            this.router.navigate(['']);
          }
        });
    });

  }



  editBook() {
    console.log(this.book)
    this.dataService.updateBook(this.book)
      .subscribe({
        next: data => {
          console.log(data);
          this.snackBar.open("Book edited successfull!", "Success");
          this.router.navigate(['/']);
          
        },
        error: error => {
          console.log(error);
          this.snackBar.open("Error book editing.", "Error ");
        }
    })
  }
}
