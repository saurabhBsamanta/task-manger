export type addTask = (category: string, taskContent: string) => void;

export type Task = {
  id: number;
  category: string;
  content: string;
};

export type Tasks = Task[];

export type moveTask = (
  taskId: number,
  sourceCategory: string,
  destinationCategory: string
) => void;
