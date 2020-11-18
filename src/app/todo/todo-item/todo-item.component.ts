import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Todo } from '../model/todo.model';
import { EditarTodoAction, EliminarTodoAction, ToggleTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: [
  ]
})
export class TodoItemComponent implements OnInit {

  @Input() todo:Todo;
  @ViewChild('textInputFisico') textInputFisico: ElementRef;

  checkField: FormControl;
  txtInput: FormControl;
  editando:boolean = false;

  constructor(
    private store:Store<AppState>
  ){}

  ngOnInit(): void {

    this.checkField = new FormControl(this.todo.completado)
    this.txtInput =  new FormControl(this.todo.texto, Validators.required)

    this.checkField.valueChanges
      .subscribe(() =>{
        const accion = new ToggleTodoAction(this.todo.id)
        this.store.dispatch(accion)
      })

  }

  onEditar(){
    this.editando = true;
    setTimeout(()=>{
      this.textInputFisico.nativeElement.select();
    },1)    
  }

  onTerminarEdicion(): void{
    this.editando = false;

    if(this.txtInput.invalid){
      return;
    }

    if(this.txtInput.value === this.todo.texto){
      return;
    }

    const accion = new EditarTodoAction(this.txtInput.value, this.todo.id)
    this.store.dispatch(accion)
  }

  onEliminar(): void{
    const accion = new EliminarTodoAction(this.todo.id)
    this.store.dispatch(accion)
  }

}
