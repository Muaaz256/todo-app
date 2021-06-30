import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css'],
})
export class TodosListComponent implements OnInit, OnDestroy {
  todos!: Todo[];
  isReady = false;

  mySubcription!: Subscription;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.mySubcription = this.todosService.getTodos().subscribe((res) => {
      this.todos = res;
      this.isReady = true;
    });
  }

  onDeleteTodo(todoId: number | string | null | undefined): void {
    const deleteOption = confirm('Are you sure that want to delete this todo?');
    if (deleteOption === true) {
      this.todosService.deleteTodo(todoId);
    }
  }

  ngOnDestroy(): void {
    this.mySubcription.unsubscribe();
  }
}
