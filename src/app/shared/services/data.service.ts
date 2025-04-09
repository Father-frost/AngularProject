import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { first, map, Observable, Subject } from 'rxjs';
import { Author, Book, Category, Favorites, User} from '../../models/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  

  constructor(private http: HttpClient, 
    private jwt: JwtHelperService, 
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  booksSubject: Subject<Book[]> = new Subject();
  books!: Book[];

  getSubject(): Subject<Book[]> {
    return this.booksSubject;
  }

  searchByTitle(search: string): void {
    if(search) {
      const searchResult = this.books.filter(book => {
        let titleLowerCase = book.title.toLowerCase();
        let searchLowerCase = search.toLowerCase();
  
        return titleLowerCase.includes(searchLowerCase);
      });
  
      this.booksSubject.next(searchResult);
    } else {
      this.booksSubject.next(this.books); 
    }
  }

  getAllFromApi(): void {
    this.getAllBooks()
      .subscribe({        
        next: (data) => {
          this.books = data.map(book => {
            // adding api url to img path
            if(!book.imgPath){ 
              book.imgPath = '/assets/placeholder.jpg';
            }
            this.findAuthorById(book.authorId).subscribe({
              next: (data) => {
                book.author = data;
                }
            });

            this.findCategoryById(book.categoryId).subscribe({
              next: (data) => {
                book.category = data;
                }
            });

            return book;
          })

          // adding books to subject
          this.booksSubject.next(this.books);
        },
        error: (error) => {
          console.log(error);
          this.snackBar.open('Error loading books, please try again later.', 'Error');
        }
      })
  }

  deleteFromApi(book: Book){
    if(book.id)
    this.deleteBook(book.id)
      .subscribe({
        next: data => {
          this.snackBar.open("Book deleted successfully!", "Sucess ")
          this.getAllFromApi();
        },
        error: error => {
          console.log(error)
          this.snackBar.open('Error deleting, please try again later.', 'Error');
        }
      })
  }

  getfavsOfUser(userId: number) {
    let params = new HttpParams().append('userId', userId);
    return this.http
      .get<any>(this.authService.baseUrl + 'GetfavsOfUser', {
        params: params,
      })
      .pipe(
        map((favs) => {
          let newFavs = favs.map((fav: any) => {
            let newFav: Favorites = {
              id: fav.id,
              userId: fav.userId,
              userName: fav.user.Name,
              bookId: fav.bookId,
              bookTitle: fav.book.title,
            };
            return newFav;
          });
          return newFavs;
        })
      );
  }


  addNewCategory(category: Category) {
    return this.http.post(this.authService.baseUrl + 'AddCategory', category, {
      responseType: 'text',
    });
  }

  getCategories() {
    return this.http.get<Category[]>(this.authService.baseUrl + 'categories');
  }

  getAuthors() {
    return this.http.get<Author[]>(this.authService.baseUrl + 'authors');
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.authService.baseUrl+'books');
  }

  findBookById(id: number): Observable<Book> {
    return this.http.get<Book>(this.authService.baseUrl + '/find/' + id).pipe(first());
  }

  findAuthorById(id: number): Observable<Author> {
    return this.http.get<Author>(this.authService.baseUrl + 'authors/' + id).pipe(first());
  }

  findCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(this.authService.baseUrl + 'categories/' + id).pipe(first());
  }

  deleteBook(id: number): Observable<Book> {
    return this.http.delete<Book>(this.authService.baseUrl + '/' + id).pipe(first());
  }

  postBook(book: Book): Observable<Book> {
    const formData = this.formDataFromBook(book);
    return this.http.post<Book>(this.authService.baseUrl, formData).pipe(first());
  }

  updateBook(book: Book): Observable<Book> {
    const formData = this.formDataFromBook(book);
    return this.http.put<Book>(this.authService.baseUrl, formData).pipe(first());
  }


  formDataFromBook(book: Book): FormData {
    const formData = new FormData();

    // appending the book attributes
    if(book.id)
      formData.append("id", book.id.toString());

    if(book.title)
      formData.append("title", book.title);

    if(book.description)
      formData.append("description", book.description);

    //if(book.category)
    //  formData.append("category", book.category.name);

    if(book.author)
      formData.append("author", book.author.name);

    if(book.img)
      formData.append("img", book.img, book.img.name);

    if(book.imgPath)
      formData.append("imgPath", book.imgPath);

    return formData;
  }

  returnBook(userId: string, bookId: string, fine: number) {
    return this.http.get(this.authService.baseUrl + 'ReturnBook', {
      params: new HttpParams()
        .append('userId', userId)
        .append('bookId', bookId)
        .append('fine', fine),
      responseType: 'text',
    });
  }

  approveRequest(userId: number) {
    return this.http.get(this.authService.baseUrl + 'ApproveRequest', {
      params: new HttpParams().append('userId', userId),
      responseType: 'text',
    });
  }

  getFavs() {
    return this.http.get<any>(this.authService.baseUrl + 'GetFavs').pipe(
      map((favs) => {
        let newFavs = favs.map((fav: any) => {
          let newFav: Favorites = {
            id: fav.id,
            userId: fav.userId,
            userName: fav.user.Name,
            bookId: fav.bookId,
            bookTitle: fav.book.title,
          };
          return newFav;
        });
        return newFavs;
      })
    );
  }

  

}

