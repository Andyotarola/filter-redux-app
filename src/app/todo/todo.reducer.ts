import { from } from 'rxjs';
import { Todo } from "./model/todo.model";
import * as fromTodo from "./todo.actions";


const todo1 = new Todo('Salvar al mundo')
const todo2 = new Todo('Vercer a Thanos')

todo2.completado = true

const estadoInicial:Todo[] = [
    todo1, todo2
];

export const todoReducer = (state = estadoInicial, action:fromTodo.Acciones) => {

    switch(action.type){

        case fromTodo.AGREGAR:
            const todo = new Todo(action.texto);
            return [ ...state , todo];

        case fromTodo.TOGGLE_ALL_TODO:
            return state.map(todoEdit =>{
                return{
                    ...todoEdit,
                    completado: action.completado
                }
            })

        case fromTodo.TOGGLE_TODO:
            return state.map((todoEdit)=>{
                if(todoEdit.id === action.id){
                    return {
                        ...todoEdit,
                        completado: !todoEdit.completado
                    }
                }else{
                    return todoEdit;
                }
            })
        case fromTodo.EDITAR_TODO:

            return state.map((todoEdit)=>{
                if(todoEdit.id === action.id){
                    return {
                        ...todoEdit,
                        texto: action.texto
                    }
                }else{
                    return todoEdit
                }
            })
        
        case fromTodo.ELIMINAR_TODO:
            return state.filter(todoEdit => todoEdit.id !== action.id)
            
        case fromTodo.ELIMINAR_ALL_TODO:
            return state.filter(todoEdit => !todoEdit.completado)  

        default:
            return state;
    }
}