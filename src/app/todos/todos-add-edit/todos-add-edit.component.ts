import { Observable } from 'rxjs';
import { TodosService } from 'src/app/services/todos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-todos-add-edit',
  templateUrl: './todos-add-edit.component.html',
  styleUrls: ['./todos-add-edit.component.css'],
})
export class TodosAddEditComponent implements OnInit {
  todoTask: string = '';
  todoDetails: string = '';
  dueDate: string = this.getFormattedDateTime(new Date());
  todoId!: number;
  isReady = false;
  isEdit = false;
  errorMessage: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private todosService: TodosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const todoId = +this.activatedRoute.snapshot.params?.todoId;
    if (todoId) {
      this.isEdit = true;
      this.todoId = todoId;
      this.todosService.getTodoDetails(todoId).subscribe((res) => {
        this.todoTask = res.task;
        this.todoDetails = res.detail;
        this.dueDate = this.getFormattedDateTime(res.date);
        this.isReady = true;
      });
    } else {
      this.isReady = true;
    }
  }

  onSave() {
    this.isReady = false;
    if (!this.validateInput()) {
      this.errorMessage = 'Please, provide all the inputs.';
      this.isReady = true;
    } else {
      this.errorMessage = null;
      let addEditObservable!: Observable<null>;
      if (this.isEdit) {
        addEditObservable = this.todosService.editTodo(
          this.todoId,
          this.todoTask,
          this.todoDetails,
          new Date(this.dueDate)
        );
      } else {
        addEditObservable = this.todosService.addTodo(
          this.todoTask,
          this.todoDetails,
          new Date(this.dueDate)
        );
      }
      addEditObservable.subscribe((res) => {
        this.isReady = true;
        const path = this.isEdit ? '../../' : '../';
        this.router.navigate([path], { relativeTo: this.activatedRoute });
      });
    }
  }

  validateInput(): boolean {
    if (!this.todoTask || !this.todoDetails || !this.dueDate) return false;
    return true;
  }

  getFormattedDateTime(dateTime: Date): string {
    const year = dateTime.getFullYear();
    const month = this.getFromattedValue(dateTime.getMonth() + 1);
    const day = this.getFromattedValue(dateTime.getDate());
    const hours = this.getFromattedValue(dateTime.getHours());
    const minutes = this.getFromattedValue(dateTime.getMinutes());
    const seconds = this.getFromattedValue(dateTime.getSeconds());
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  getFromattedValue(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  onCancel() {
    const path = this.isEdit ? '../../' : '../';
    this.router.navigate([path], { relativeTo: this.activatedRoute });
  }
}
