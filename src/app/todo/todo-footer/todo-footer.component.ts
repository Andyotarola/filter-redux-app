import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as  fromFilterActions from '../../filter/filter.actions';
import * as fromTodoActions from '../todo.actions';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: [
  ]
})
export class TodoFooterComponent implements OnInit {

  filtersValids:fromFilterActions.filterValids[] = ['completados', 'pendientes', 'todos']
  filterCurrent:fromFilterActions.filterValids;
  pendientes:number;

  constructor(
    private store:Store<AppState>
  ){}

  ngOnInit(): void {

    this.store.subscribe( state => {
      this.onContadorPendientes(state.todos)
      this.filterCurrent = state.filter
    })

  }

  onChangeFilter(newFilter: fromFilterActions.filterValids): void{
    
    const accion = new fromFilterActions.SetFilterAction(newFilter)
    
    this.store.dispatch(accion)

  }

  onContadorPendientes(todos: Todo[]){
    this.pendientes = todos.filter(todo => !todo.completado).length
  }

  onDeleteAll(): void{
    const accion = new fromTodoActions.EliminarTodoAllAction();

    this.store.dispatch(accion)

  }

}
