import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos: Todo[] = [
    {
      id: 12,
      task: 'Go To Gym',
      detail: 'Go to gym to keep myself fit',
      date: new Date('12/14/2021 12:15:00'),
    },
    {
      id: 45,
      task: 'Complete Assignment',
      detail: 'Complete the Angular Assignment before Tuesday.',
      date: new Date('12/26/2021 07:00:00'),
    },
  ];

  addTodo(todo: Todo): void {
    this.todos.push(todo);
  }

  getTodos(): Observable<Todo[]> {
    return new Observable<Todo[]>((observer) => {
      setTimeout(() => {
        observer.next(this.todos);
      }, 2000);
    });
  }

  getTodoDetails(id: number | string): Observable<Todo> {
    return new Observable<Todo>((observer) => {
      setTimeout(() => {
        const todo = this.todos.find((todo) => todo.id === id);
        if (todo) observer.next(todo);
        else observer.error('No Found');
      }, 2000);
    });
  }

  deleteTodo(id: number | string | null | undefined): void {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    this.todos.splice(todoIndex, 1);
  }
}
