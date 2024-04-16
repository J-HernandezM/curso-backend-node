export interface User {
  id?: number;
  name: string;
  type: string;
  tasks: Task;
}

export interface Task {
  id?: number;
  title: string;
  completed: boolean;
}
