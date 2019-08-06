import { createAction, props } from '@ngrx/store';

export const loadPokemons = createAction('[List Component] Load', props<{results: any[]}>());

export const saveFilter = createAction('[List Component] Save', props<{text: string}>());

export const previousSave = createAction('[List Component] Previous', props<{previous: string}>());
export const nextSave = createAction('[List Component] Next', props<{next: string}>());
