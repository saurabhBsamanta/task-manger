import {
  Task,
  addTask,
  moveTask,
} from '../../views/TaskManager/TaskManaget.types';

export type TaskItemProps = {
  id: number;
  task: Task;
  index: number;
  addTask: addTask;
  moveTask: moveTask;
  sourceCategory: string;
};
