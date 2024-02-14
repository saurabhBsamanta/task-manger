import {
  DndContext,
  DragEndEvent,
  UniqueIdentifier,
  closestCorners,
} from '@dnd-kit/core';
import TaskItem from '../TaskItem/TaskItem';
import { TaskListProps } from './TaskList.types';

import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { Task } from '../../views/TaskManager/TaskManaget.types';
import './TaskList.css';

const TaskList = ({
  category,
  tasks,
  setAaddedTasks,
  addTask,
  moveTask,
}: TaskListProps) => {
  //   const [{ isOver }, drop] = useDrop({
  //     accept: 'TASK',
  //     drop: (item) => moveTask(item.category, category, item.task),
  //     collect: (monitor) => ({
  //       isOver: monitor.isOver(),
  //     }),
  //   });
  const getTaskPos = (id: UniqueIdentifier | undefined) =>
    tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id === over?.id) return;

    setAaddedTasks((tasks: Task[]) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over?.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <div className="task-category">
        <h2>{category}</h2>
        <div>
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map((task, index) => (
              <TaskItem
                addTask={addTask}
                key={task.id}
                task={task}
                index={index}
                id={task.id}
                moveTask={moveTask}
                sourceCategory={category}
              />
            ))}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
};

export default TaskList;
