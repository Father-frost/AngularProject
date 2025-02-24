import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SafeScript } from '@angular/platform-browser';
import { from, last } from 'rxjs';
import { ListOfButtons } from './list-of-buttons.model';
import { NgClass, NgFor } from '@angular/common';
import { CalcResultOutputComponent } from "../calc-result-output/calc-result-output.component";
import { CalcBtnComponent } from "../calc-btn/calc-btn.component";

@Component({
  selector: 'app-calculator',
  imports: [NgFor, NgClass, CalcResultOutputComponent, CalcBtnComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  darkTheme = false;

  changeTheme() {
    this.darkTheme = !this.darkTheme;
  }
  

}
