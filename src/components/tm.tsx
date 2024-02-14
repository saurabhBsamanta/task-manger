import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TaskApp = () => {
  const [tasks, setTasks] = useState({
    added: [],
    started: [],
    completed: [],
  });

 

  const addTask = (category, taskContent) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [category]: [
        ...prevTasks[category],
        { id: Date.now(), content: taskContent },
      ],
    }));
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceTasks = [...tasks[source.droppableId]];
    const [removed] = sourceTasks.splice(source.index, 1);
    const destinationTasks = [...tasks[destination.droppableId]];
    destinationTasks.splice(destination.index, 0, removed);

    setTasks((prevTasks) => ({
      ...prevTasks,
      [source.droppableId]: sourceTasks,
      [destination.droppableId]: destinationTasks,
    }));
  };

  return (
    <div className="task-app">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="task-categories">
          {Object.keys(tasks).map((category) => (
            <TaskList
              key={category}
              category={category}
              tasks={tasks[category]}
            />
          ))}
        </div>
      </DragDropContext>
      <TaskForm addTask={addTask} />
    </div>
  );
};

const TaskList = ({ category, tasks }) => {
  return (
    <Droppable droppableId={category}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <h2>{category}</h2>
          {tasks.map((task, index) => (
            <TaskItem key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

const TaskItem = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          className="task-item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
};

const TaskForm = ({ addTask }) => {
  const [taskContent, setTaskContent] = useState('');

  const handleChange = (e) => {
    setTaskContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskContent.trim()) return;
    addTask('added', taskContent);
    setTaskContent('');
  };

  return (
    <div className="add-task">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add Task"
          value={taskContent}
          onChange={handleChange}
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskApp;
