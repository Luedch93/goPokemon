import { createFeatureSelector, createSelector } from "@ngrx/store";

import { Pagination } from "src/app/types/Pagination";

export const selectPaginationState =
  createFeatureSelector<Pagination>("pagination");

export const selectPaginationLimit = createSelector(
  selectPaginationState,
  (paginationState) => paginationState.limit,
);
export const selectPaginationPage = createSelector(
  selectPaginationState,
  (paginationState) => paginationState.page,
);
