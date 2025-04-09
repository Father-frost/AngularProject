import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialModule } from '../../../material/material.module';


@Component({
  selector: 'page-footer',
  imports: [MatToolbarModule, MaterialModule],
  templateUrl: './page-footer.component.html',
  styleUrl: './page-footer.component.scss'
})
export class PageFooterComponent {

}
