import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTodo } from "../store/todoSlice";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}


const TodoForm = () => {

  const [task, setTask] = useState<Todo>({
    id: 0,
    title: '',
    completed: false,
  });

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, title: e.target.value });
  }

  const handleAddTask = () => {
    if (task.title.trim()) {
      dispatch(addTodo(task.title));
      setTask({ id: 0, title: '', completed: false });
    }

  }

  return (
    <div>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <TextField
          fullWidth
          value={task.title}
          variant="outlined"
          label="Add a new task"
          // placeholder=""
          InputProps={{
            sx: {
              bgcolor: 'background.paper',
              color: 'text.primary',
              input: { color: 'text.primary' },
            },
          }}
          onChange={handleChange}
        />
        <Button

          variant="contained"
          color="primary"
          sx={{
            whiteSpace: 'nowrap', minWidth: 100
          }}
          onClick={handleAddTask}
        >
          Add
        </Button>
      </Stack>

    </div>
  );
}

export default TodoForm;
