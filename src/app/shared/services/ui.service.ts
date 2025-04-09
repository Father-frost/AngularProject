import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  searchBarVisibleSub: Subject<boolean> = new Subject;
  isSearchBarVisible: boolean = false;

  constructor() { }

  getSearchSubject(): Subject<boolean>{
    return this.searchBarVisibleSub;
  } 

  showSearchBar(showSearch: boolean): void {
    this.isSearchBarVisible = showSearch;
    this.searchBarVisibleSub.next(showSearch);
  }
}
