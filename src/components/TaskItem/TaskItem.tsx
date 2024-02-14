import { TaskItemProps } from './TaskItem.types';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

import './TaskItem.css';
const TaskItem = ({
  id,
  task,
  index,
  addTask,
  moveTask,
  sourceCategory,
}: TaskItemProps) => {
  //   const [{ isDragging }, drag] = useDrag({
  //     type: 'TASK',
  //     item: { task, category },
  //     collect: (monitor) => ({
  //       isDragging: monitor.isDragging(),
  //     }),
  //   });

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  const onStarClick = (taskId: number, sourceCategory: string) => {
    moveTask(task.id, sourceCategory, 'started');
    console.log('task.id onStarClick ', taskId);
  };
  const onCompleteClick = (taskId: number) => {
    moveTask(task.id, sourceCategory, 'completed');
    console.log('task.id onCompleteClick', taskId);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task"
    >
      <div className="task-content">{task.content}</div>
      <div className="task-icons">
        <i
          className="far fa-star"
          onClick={() => onStarClick(task.id, sourceCategory)}
        ></i>
        <i
          className="far fa-check-circle"
          onClick={() => onCompleteClick(task.id)}
        ></i>
      </div>
    </div>
  );
};

export default TaskItem;
