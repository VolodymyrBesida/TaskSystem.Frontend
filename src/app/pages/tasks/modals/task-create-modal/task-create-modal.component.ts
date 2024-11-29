import { Component, EventEmitter, Output } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { TaskDataService } from "src/app/services/tasks/task-data.service";
import { TaskDto, TaskDtoModel } from "src/app/services/tasks/task.models";
import { TaskService } from "src/app/services/tasks/task.service";

@Component({
    selector: 'task-create-modal',
    templateUrl: './task-create-modal.component.html',
    styleUrls: ['./task-create-modal.component.scss']
})

export class TaskCreateModalComponent {
    public task: TaskDtoModel = new TaskDtoModel();
    @Output() createdTask = new EventEmitter<TaskDto>();

    statuses: string[] = [];
    users: string[] = [];

    constructor(private taskService: TaskService,
        private dialogRef: MatDialogRef<TaskCreateModalComponent>,
        private taskDataService: TaskDataService
    ) {
        this.statuses = this.taskDataService.getStatuses();
        this.users = this.taskDataService.getUsers();
    }

    close() {
        this.dialogRef.close();
    }

    save(taskForm: any) {
        if(!this.task)
            return;
        this.taskService.createTask(this.task).subscribe({
            next: resp => {
                this.createdTask.emit(this.task);
                this.dialogRef.close();
            }, error: error => console.log(error)
        });
    }
}