import {
  Task,
  Tasks,
  addTask,
  moveTask,
} from '../../views/TaskManager/TaskManaget.types';

export type TaskListProps = {
  category: string;
  tasks: Tasks;
  setAaddedTasks: (task: Task[]) => void;
  addTask: addTask;
  moveTask: moveTask;
};
