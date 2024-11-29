export interface TaskDto {
    id: number;
    name: string;
    description: string;
    status: string;
    assignedTo: string | null;
}

export class TaskDtoModel implements TaskDto{
    id: number;
    name: string;
    description: string;
    status: string;
    assignedTo: string | null;
}