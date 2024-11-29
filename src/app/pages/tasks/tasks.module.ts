import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MaterialModule } from "src/app/material.module";
import { TaskListComponent } from "./task-list/task-list.component";
import { RouterModule, Routes } from "@angular/router";
import { BlankComponent } from "src/app/layouts/blank/blank.component";
import { TaskService } from "src/app/services/tasks/task.service";
import { TaskEditModalComponent } from "./modals/task-edit-modal/task-edit-modal.component";
import { TaskCreateModalComponent } from "./modals/task-create-modal/task-create-modal.component";
import { TaskDataService } from "src/app/services/tasks/task-data.service";

const routes: Routes = [
    {
      path: '',
      component: BlankComponent,
      children: [
        {
          path: 'list',
          component: TaskListComponent
        }
      ]
    }
  ];

@NgModule({
    declarations: [ TaskListComponent, TaskEditModalComponent, TaskCreateModalComponent],
    imports: [CommonModule, MatMenuModule, MatButtonModule, MaterialModule, RouterModule.forChild(routes)],
    providers: [TaskService, TaskDataService]
})
export class TasksModule {}