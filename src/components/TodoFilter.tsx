import React from 'react';
import { TextField, Button, Stack, Select, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setFilter } from '../store/todoSlice';

const TodoFilter = () => {
  const dispatch = useDispatch();

  const [task, setTask] = React.useState<string>("");
  const [status, setStatus] = React.useState<string>("all");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleSearch = () => {
    dispatch(setFilter({ task, status }));
  };

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
      <TextField
        size='small'
        value={task}
        variant="outlined"
        label="Search for task name"
        onChange={handleChange}
        InputProps={{
          sx: {
            bgcolor: 'background.paper',
            color: 'text.primary',
            input: { color: 'text.primary' },
          },
        }}
        sx={{ display: "flex" }}
      />
      <Select
        size='small'
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        variant="outlined"
        sx={{ minWidth: 140 }}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="completed">Completed</MenuItem>
        <MenuItem value="pending">Pending</MenuItem>
      </Select>
      <Button size='small' variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </Stack>
  );
};

export default TodoFilter;
