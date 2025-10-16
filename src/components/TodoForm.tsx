import React, { useState } from 'react';
import { TextField, Button, Stack, Box } from '@mui/material';
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
  };

  const handleAddTask = () => {
    if (task.title.trim()) {
      dispatch(addTodo(task.title));
      setTask({ id: 0, title: '', completed: false });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          width: { xs: '100%', sm: '80%', md: '60%' },
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextField
          fullWidth
          size="small"
          value={task.title}
          variant="outlined"
          label="Add a new task"
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
            width: { xs: '100%', sm: 'auto' }, // ✅ full width on mobile, normal on large
            whiteSpace: 'nowrap',
            minWidth: 100, // ✅ fixed minimum width for consistent look
          }}
          onClick={handleAddTask}
        >
          Add
        </Button>
      </Stack>
    </Box>
  );
};

export default TodoForm;
