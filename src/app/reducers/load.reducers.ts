import { createReducer, on } from '@ngrx/store';
import { loadPokemons, saveFilter, nextSave, previousSave } from '../actions/load.actions';

export const initialState = [];
export const saveInitialState = '';

export const previousState = '';
export const nextState = '';


export const loadReducer = createReducer(initialState,
    on(loadPokemons, (state, payload) => {
        return [...payload.results];
    })
);

export const saveReducer = createReducer(saveInitialState,
    on(saveFilter, (state, payload) => {
        return payload.text;
    })
);

export const previousReducer = createReducer(previousState,
    on(previousSave, (state, payload) => {
        return payload.previous;
    })
);

export const nextReducer = createReducer(nextState,
    on(nextSave, (state, payload) => {
        return payload.next;
    })
);