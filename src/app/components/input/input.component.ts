import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  isNight;
  jsonInput;
  result;
  innerKeys: any[];

  constructor() {
    this.innerKeys = [];
    this.result = "Hello amazing person! Your converted JSON will be printed here";
    this.isNight = (new Date()).getHours() >= 6 && (new Date()).getHours() <= 17 ? false : true;
    if(this.isNight){
      document.getElementsByTagName("body")[0].classList.add("night"); 
    }
   }

  ngOnInit() {
  }

  convertJSON(){
    if(!!this.jsonInput && this.validate(this.jsonInput)){
      let result = {};
      let parsedJSON = JSON.parse(this.jsonInput);
      Object.keys(parsedJSON).forEach((k)=> {
        if (typeof parsedJSON[k] === 'object') {
          this.innerKeys.push(k);
          return this.getAllInnerJSON(parsedJSON[k], result);
        }
        else{
          result[parsedJSON[k]] = k;
        }
      });
      this.result = result;
    }
    else{
      alert("Please insert a valid JSON");
    }
  }

  getAllInnerJSON(json, result){
    let innerJSON = {}

    Object.keys(json).forEach((k) =>{
      if (typeof json[k] === 'object') {
        this.innerKeys.push(k);
        return this.getAllInnerJSON(json[k], result);
      }
      else{
        innerJSON[json[k]] = k;
      }
    });

    let length = this.innerKeys.length;
    if(length > 0){
      let flippedInnerJSON = {}
      for(let i=0;i<length-1;i++){
        flippedInnerJSON[this.innerKeys.pop()] = innerJSON;
        innerJSON = flippedInnerJSON;
      }
      result[this.innerKeys.pop()] = JSON.stringify(flippedInnerJSON) === JSON.stringify({}) ? innerJSON : flippedInnerJSON;
    }
  }

  validate(json){
    try{
      JSON.parse(json);
      return true;
    }
    catch(e){
      return false;
    }
  }

}
