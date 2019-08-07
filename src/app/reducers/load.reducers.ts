import { createReducer, on } from '@ngrx/store';
import { loadPokemons, saveFilter, nextSave, previousSave, currentUrlSave } from '../actions/load.actions';

export const initialState = [];
export const saveInitialState = '';

export const previousState = '';
export const nextState = '';
export const currentUrlState = 'https://pokeapi.co/api/v2/pokemon';

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

export const currentUrlReducer = createReducer(currentUrlState,
    on(currentUrlSave, (state, payload) => {
      return payload.url;
    })
);
