import { Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({ template: '' })
export class TestComponent {}

export const routes: Routes = [
  { path: '', component: TestComponent},
  { path: 'pokemon/:name', component: TestComponent}
];
