import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ResultComponent } from '../result/result.component';

import * as _ from 'lodash'

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputComponent, ResultComponent ],
      imports: [FormsModule, ReactiveFormsModule, MatButtonModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create input component', () => {
    expect(component).toBeTruthy();
  });

  it('should accept valid JSON and reject invalid JSON and empty string', () => {
    expect(component.validate('{"a":1}')).toBeTruthy();
    expect(component.validate('[{"a":1}]')).toBeTruthy();
    expect(component.validate("test")).toBeFalsy();
    expect(component.validate("")).toBeFalsy();
  });

  it('should accurately convert a valid JSON to the flipped version', () => {
    component.jsonInput = '{"a":"test"}';
    fixture.detectChanges();
    component.convertJSON();
    expect(_.isEqual(JSON.stringify(component.result), '{"test":"a"}')).toBeTruthy();
  });

  it('should accurately convert a valid nested JSON to the flipped version', () => {
    component.jsonInput = '{"a":"test", "b":{"c":"ok"}}';
    fixture.detectChanges();
    component.convertJSON();
    expect(_.isEqual(JSON.stringify(component.result), '{"test":"a","b":{"ok":"c"}}')).toBeTruthy();
  });

  it('should accurately convert a valid nested JSON with array to the flipped version', () => {
    component.jsonInput = '{"a":"test", "b":{"c":[1,2,3]}}';
    fixture.detectChanges();
    component.convertJSON();
    expect(_.isEqual(JSON.stringify(component.result), '{"test":"a","b":{"c":{"1":"0","2":"1","3":"2"}}}')).toBeTruthy();
  });
});
