import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './header/header.component';
import { HelpComponent } from './help/help.component';
import { TodosComponent } from './todos/todos.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodosAddEditComponent } from './todos/todos-add-edit/todos-add-edit.component';
import { TodosDetailsComponent } from './todos/todos-details/todos-details.component';
import { TodosListComponent } from './todos/todos-list/todos-list.component';
import { Routes, RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'todos',
    component: TodosComponent,
    children: [
      {
        path: 'add',
        component: TodosAddEditComponent,
      },
      {
        path: 'edit/:todoId',
        component: TodosAddEditComponent,
      },
      {
        path: 'details/:todoId',
        component: TodosDetailsComponent,
      },
      {
        path: '',
        component: TodosListComponent,
      },
    ],
  },
  {
    path: 'help',
    component: HelpComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodosComponent,
    HelpComponent,
    HeaderComponent,
    TodosAddEditComponent,
    TodosDetailsComponent,
    TodosListComponent,
    NotFoundComponent,
    LoaderComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
