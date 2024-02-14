import { FormEvent, useState } from 'react';
import { TaskFormProps } from './TaskForm.types';
import './TaskForm.css';
const TaskForm = ({ addTask }: TaskFormProps) => {
  const [taskContent, setTaskContent] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskContent(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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

export default TaskForm;
