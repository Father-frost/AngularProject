import { Component, Input, OnInit } from '@angular/core';
import { CalcBtnComponent } from "../calc-btn/calc-btn.component";
import { ListOfButtons } from '../calculator/list-of-buttons.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-calc-result-output',
  imports: [NgFor, CalcBtnComponent],
  templateUrl: './calc-result-output.component.html',
  styleUrl: './calc-result-output.component.css'
})
export class CalcResultOutputComponent {

  inputData:string = '';
  resultData ='';

  listOfBtns: ListOfButtons[] = [
    {id:'1', operation:'1', displayValue:'1', handleClick:()=>{this.pressNum('1');}},
    {id:'2', operation:'2', displayValue:'2', handleClick:()=>{this.pressNum('2');}},
    {id:'3', operation:'3', displayValue:'3', handleClick:()=>{this.pressNum('3');}},
    {id:'4', operation:'4', displayValue:'4', handleClick:()=>{this.pressNum('4');}},
    {id:'5', operation:'5', displayValue:'5', handleClick:()=>{this.pressNum('5');}},
    {id:'6', operation:'6', displayValue:'6', handleClick:()=>{this.pressNum('6');}},
    {id:'7', operation:'7', displayValue:'7', handleClick:()=>{this.pressNum('7');}},
    {id:'8', operation:'8', displayValue:'8', handleClick:()=>{this.pressNum('8');}},
    {id:'9', operation:'9', displayValue:'9', handleClick:()=>{this.pressNum('9');}},
    {id:'10', operation:'0', displayValue:'0', handleClick:()=>{this.pressNum('0');}},
    {id:'11', operation:'.', displayValue:'.', handleClick:()=>{this.pressNum('.');}},
    {id:'12', operation:'+', displayValue:'+', handleClick:()=>{this.pressOrepator('+')}},
    {id:'13', operation:'-', displayValue:'-', handleClick:()=>{this.pressOrepator('-')}},
    {id:'14', operation:'*', displayValue:'*', handleClick:()=>{this.pressOrepator('*')}},
    {id:'15', operation:'/', displayValue:'/', handleClick:()=>{this.pressOrepator('/')}},
    {id:'16', operation:'=', displayValue:'=', handleClick:()=>{this.getAnswer()}},
    {id:'17', operation:'Clear', displayValue:'C', handleClick:()=>{this.clearAll()}},
    {id:'18', operation:'Backspace', displayValue:'Backspace', handleClick:()=>{this.clear()}},
  ]
  dataFromButton ='0';

  getChildData(event: any):void {
    console.log('Data from button'+event);

    let clickedButton = this.listOfBtns.find(x => x.id == event);
    clickedButton?.handleClick();
  }

  pressNum(num: string) {
    console.log(num);
    if (num==".") {
      if (this.inputData !="") {
        const lastNum=this.getLastOperand();
        console.log(lastNum.indexOf("."));
        if (lastNum.lastIndexOf(".") >=0) return;
      }
    }
    if (num=="0") {
      if (this.inputData=="0"){
        return;
      }
      const prevKey = this.inputData[this.inputData.length - 1];
      if (prevKey ==='/') {
        return;
      }
    }

    this.inputData = this.inputData + num;
    this.calcAnswer();

  }

  getLastOperand() {
    let pos:number;
    console.log(this.inputData);
    pos = this.inputData.toString().lastIndexOf("+");
    if (this.inputData.toString().lastIndexOf("-") > pos){
      pos =this.inputData.lastIndexOf("-");
    }
    if (this.inputData.toString().lastIndexOf("*") > pos){
      pos =this.inputData.lastIndexOf("*");
    }
    if (this.inputData.toString().lastIndexOf("/") > pos){
      pos =this.inputData.lastIndexOf("/");
    }
    console.log('Last '+this.inputData.substr(pos+1));
    return this.inputData.substr(pos+1);
  }

  pressOrepator(op: string){
    const lastKey = this.inputData[this.inputData.length -1];
    if (lastKey ==='/' || lastKey === '*' || lastKey ==='-' || lastKey === '+') {
      return;
    }

    this.inputData = this.inputData + op;
    this.calcAnswer();
  }

  clear() {
    if (this.inputData !="") {
      this.inputData = this.inputData.substr(0,this.inputData.length-1)
    }
  }

  clearAll() {
    this.resultData = '';
    this.inputData = '';
  }

  calcAnswer() {
    let formula = this.inputData;
    let lastKey = formula[formula.length - 1];

    if (lastKey === '.') {
      formula = formula.substr(0,formula.length -1);
    }
    lastKey = formula[formula.length - 1];

    if (lastKey ==='/' || lastKey === '*' || lastKey ==='-' || lastKey === '+' || lastKey === '.') {
      formula = formula.substr(0,formula.length -1);
    }

    console.log("Formula " +formula);
    this.resultData = eval(formula);
  }

  getAnswer() {
    this.calcAnswer();
    this.inputData = this.resultData;
    if (this.inputData == "0") {
      this.inputData="";
    }
  }

}

