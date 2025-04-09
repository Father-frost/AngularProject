import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MaterialModule } from '../../../material/material.module';
import { DataService } from '../../services/data.service';
import { Author, Category } from '../../../models/models';
import { UiService } from '../../services/ui.service';
import { NgIf } from '@angular/common';

export interface AuthorOption {
  displayValue: string;
  value: number;
}

export interface CategoryOption {
  displayValue: string;
  value: number;
}

@Component({
  selector: 'app-page-toolbox',
  imports: [MaterialModule, NgIf],
  templateUrl: './page-toolbox.component.html',
  styleUrl: './page-toolbox.component.css'
})
export class PageToolboxComponent implements OnInit {
    readonly authService: AuthService = inject(AuthService);
    readonly dataService: DataService = inject(DataService);
    readonly uiService: UiService = inject(UiService);

    loggedIn: boolean = false;
    authorOptions: AuthorOption[] = [];
    categoryOptions: CategoryOption[] = [];
    isCollapsed: boolean = true;
    isSearchBarVisible: boolean = this.uiService.isSearchBarVisible;

    constructor() {

      this.dataService.getAuthors().subscribe({
        next: (res: Author[]) => {
          res.forEach((c) => {
            this.authorOptions.push({
              value: c.id,
              displayValue: `${c.name}`,
            });
          });
        },
      });

      this.dataService.getCategories().subscribe({
        next: (res: Category[]) => {
          res.forEach((c) => {
            this.categoryOptions.push({
              value: c.id,
              displayValue: `${c.name}`,
            });
          });
        },
      });
    }

    ngOnInit(): void {
      this.uiService.getSearchSubject()
        .subscribe(isVisible => { this.isSearchBarVisible = isVisible })
    }
  
    searchByTitle(search: string): void {
      this.dataService.searchByTitle(search);
    }

}
