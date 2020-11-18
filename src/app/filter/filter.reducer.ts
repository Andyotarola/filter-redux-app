import * as fromFilter from './filter.actions';

const estadoInicial: fromFilter.filterValids = 'todos';

export const filterReducer = (  state = estadoInicial, 
                                action: fromFilter.acciones) =>{

    switch(action.type){
        case fromFilter.SET_FILTER:
            return action.filter;
        default:
            return state;
    }
}