import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import  * as fromTodoActions from '../todo.actions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styles: [
  ]
})
export class TodoAddComponent implements OnInit {

  txtInput:FormControl = new FormControl('', Validators.required)

  constructor(
    private store:Store<AppState>
  ){}

  ngOnInit(): void {
  }

  onAgregarTodo(){
    if(this.txtInput.invalid){
      return;
    }else{
      const accion = new fromTodoActions.AgregarTodoAction(this.txtInput.value)

      this.store.dispatch(accion)

      this.txtInput.setValue('')

    }
  }

}
