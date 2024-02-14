import { useEffect, useState } from 'react';
import TaskForm from '../../components/AddTask/TaskForm';
import TaskList from '../../components/TaskList.tsx/TaskList';
import { Task, Tasks, addTask } from './TaskManaget.types';

// const sensors = useSensors(
//   useSensor(PointerSensor),
//   useSensor(KeyboardSensor, {
//     coordinateGetter: sortableKeyboardCoordinates,
//   })
// );
const TaskManager = () => {
  const [addedTasks, setAaddedTasks] = useState<Tasks>([]);
  const [startedTasks, setStartedTasks] = useState<Tasks>([]);
  const [completedTasks, setCompletedTasks] = useState<Tasks>([]);

  const addTask: addTask = (category, taskContent) => {
    const newTask: Task = { id: Date.now(), content: taskContent, category };
    // setAaddedTasks([...addedTasks, newTask]);

    switch (category) {
      case 'added':
        setAaddedTasks([...addedTasks, newTask]);
        break;
      case 'started':
        setStartedTasks([...startedTasks, newTask]);
        break;
      case 'completed':
        setCompletedTasks([...completedTasks, newTask]);
        break;
      default:
        break;
    }
  };

  const moveTask = (taskId, sourceCategory, destinationCategory) => {
    const taskToMove = getTaskById(taskId, sourceCategory);
    if (!taskToMove) return;

    switch (destinationCategory) {
      case 'added':
        setAaddedTasks([...addedTasks, { ...taskToMove, category: 'added' }]);
        break;
      case 'started':
        setStartedTasks([
          ...startedTasks,
          { ...taskToMove, category: 'started' },
        ]);
        break;
      case 'completed':
        setCompletedTasks([
          ...completedTasks,
          { ...taskToMove, category: 'completed' },
        ]);
        break;
      default:
        break;
    }

    removeTaskById(taskId, sourceCategory);
  };
  const getTaskById = (taskId, category) => {
    switch (category) {
      case 'added':
        return addedTasks.find((task) => task.id === taskId);
      case 'started':
        return startedTasks.find((task) => task.id === taskId);
      case 'completed':
        return completedTasks.find((task) => task.id === taskId);
      default:
        return null;
    }
  };

  const removeTaskById = (taskId, category) => {
    switch (category) {
      case 'added':
        setAaddedTasks(addedTasks.filter((task) => task.id !== taskId));
        break;
      case 'started':
        setStartedTasks(startedTasks.filter((task) => task.id !== taskId));
        break;
      case 'completed':
        setCompletedTasks(completedTasks.filter((task) => task.id !== taskId));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '{}');
    if (storedTasks) {
      setAaddedTasks(storedTasks.addedTasks || []);
      setStartedTasks(storedTasks.startedTasks || []);
      setCompletedTasks(storedTasks.completedTasks || []);
    }
  }, []);

  useEffect(() => {
    const tasks = { addedTasks, startedTasks, completedTasks };
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [startedTasks, completedTasks, addedTasks]);

  console.log('tasks', addedTasks);

  return (
    <div>
      <TaskForm addTask={addTask} />
      <div className="task-app">
        <TaskList
          category="added"
          tasks={addedTasks}
          setAaddedTasks={setAaddedTasks}
          addTask={addTask}
          moveTask={moveTask}
        />
        <TaskList
          category="started"
          tasks={startedTasks}
          setAaddedTasks={setStartedTasks}
          addTask={addTask}
          moveTask={moveTask}
        />
        <TaskList
          category="completed"
          tasks={completedTasks}
          setAaddedTasks={setCompletedTasks}
          addTask={addTask}
          moveTask={moveTask}
        />
        {/* <TaskList category="started" tasks={tasks.started} />
        <TaskList category="completed" tasks={tasks.completed} /> */}
        {/* <TaskList
          category="started"
          tasks={tasks.started}
          moveTask={moveTask}
        />
        <TaskList
          category="completed"
          tasks={tasks.completed}
          moveTask={moveTask}
        /> */}
      </div>
    </div>
  );
};

export default TaskManager;