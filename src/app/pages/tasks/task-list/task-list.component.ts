import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { TaskDto } from "src/app/services/tasks/task.models";
import { TaskService } from "src/app/services/tasks/task.service";
import { TaskEditModalComponent } from "../modals/task-edit-modal/task-edit-modal.component";
import { TaskCreateModalComponent } from "../modals/task-create-modal/task-create-modal.component";

@Component({
    selector: 'task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss'],
    encapsulation: ViewEncapsulation.None
  })
  export class TaskListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'assignedTo', 'name', 'description', 'status'];
    avatars: { [key: number]: string } = {};
    dataSource: TaskDto[] = [];
    
    constructor(private taskService: TaskService,
        public modalDialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.loadTasks();
    }

    openCreateModal() {
        const modal = this.modalDialog.open(TaskCreateModalComponent, {
            width: 'auto',
            maxHeight: '90vh'
        })
        modal.componentInstance.createdTask.subscribe((createdTask: TaskDto) => this.loadTasks());
    }

    openEditModal(task: TaskDto) {
        const modal = this.modalDialog.open(TaskEditModalComponent, {
            width: 'auto',
            maxHeight: '90vh'
        })
        modal.componentInstance.task = task;
        modal.componentInstance.updatedTask.subscribe((updatedTask: TaskDto) => {
            const index = this.dataSource.findIndex(t => t.id === updatedTask.id);
            if (index !== -1) {
                this.dataSource[index] = updatedTask;
                this.dataSource = [...this.dataSource];
            }
        })
    }

    private loadTasks(): void {
        this.taskService.getTasks().subscribe({
            next: resp => {
                this.dataSource = resp;
                //For each task that has an 'assignedTo' property, assign a random avatar image for display in the UI.
                this.dataSource.forEach(task => {
                    if (task.assignedTo)
                        this.avatars[task.id] = this.getAvatarById(task.id);
                });
            }, error: error => console.log(error)
        });
    }

    private getAvatarById(id: number): string {
        const randomNum = Math.floor(Math.random() * 4) + 1;
        return `assets/images/profile/user-${randomNum}.jpg`;
    }
  }