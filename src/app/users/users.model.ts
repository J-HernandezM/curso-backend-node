export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  // type: string;
  // tasks: Task;
}

export interface Task {
  id?: number;
  title: string;
  completed: boolean;
}
