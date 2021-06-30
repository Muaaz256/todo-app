import { TodosService } from './../../services/todos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todos-details',
  templateUrl: './todos-details.component.html',
  styleUrls: ['./todos-details.component.css'],
})
export class TodosDetailsComponent implements OnInit {
  todo!: Todo;
  isReady = false;

  detailsSubscription!: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private todosService: TodosService
  ) {}
  ngOnInit(): void {
    const todoId = +this.activatedRoute.snapshot.params.todoId;
    this.detailsSubscription = this.todosService
      .getTodoDetails(todoId)
      .subscribe(
        (res) => {
          this.todo = res;
          this.isReady = true;
        },
        (error) => {
          this.router.navigate(['/not-found']);
        }
      );
  }

  onDeleteTodo(): void {
    const deleteOption = confirm('Are you sure that want to delete this todo?');
    if (deleteOption === true) {
      this.todosService.deleteTodo(this.todo?.id);
      this.router.navigate(['/todos']);
    }
  }
}
