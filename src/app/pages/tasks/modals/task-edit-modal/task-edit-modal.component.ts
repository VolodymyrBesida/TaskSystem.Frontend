import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { TaskDataService } from "src/app/services/tasks/task-data.service";
import { TaskDto } from "src/app/services/tasks/task.models";
import { TaskService } from "src/app/services/tasks/task.service";

@Component({
    selector: 'task-edit-modal',
    templateUrl: './task-edit-modal.component.html',
    styleUrls: ['./task-edit-modal.component.scss']
})
export class TaskEditModalComponent implements OnInit {
    @Input() task: TaskDto;
    @Output() updatedTask = new EventEmitter<TaskDto>();

    statuses: string[] = [];
    users: string[] = [];

    taskCopy: TaskDto;

    constructor(private taskService: TaskService,
        private dialogRef: MatDialogRef<TaskEditModalComponent> ,
        private taskDataService: TaskDataService
    ) {
        this.statuses = this.taskDataService.getStatuses();
        this.users = this.taskDataService.getUsers();
    }

    ngOnInit(): void {
        this.taskCopy = { ...this.task }; // Create a copy of the input object to avoid modifying the one that is tracked by the list component
    }

    close() {
        this.dialogRef.close();
    }
    
    save() {
        if(!this.task)
            return;
        this.taskService.updateTaskStatus(this.taskCopy.id, this.taskCopy.status).subscribe({
            next: resp => {
                this.updatedTask.emit(this.taskCopy);
                this.dialogRef.close();
            }, error: error => console.log(error)
        });
    }
}