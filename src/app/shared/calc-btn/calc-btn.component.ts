import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListOfButtons } from '../calculator/list-of-buttons.model';

@Component({
  selector: 'app-calc-btn',
  imports: [],
  templateUrl: './calc-btn.component.html',
  styleUrl: './calc-btn.component.css'
})
export class CalcBtnComponent {



  @Input() BtnsList!: ListOfButtons;
  @Output() emitDataToParent: EventEmitter<string> = new EventEmitter<string>();

  buttonClickHandler(event: any): void {
    console.log(this.BtnsList.id);
    this.emitDataToParent.emit(this.BtnsList.id);
  }



}
