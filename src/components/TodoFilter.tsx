import React from 'react';
import { TextField, Button, Stack, Select, MenuItem, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { Icon } from '@iconify/react';
import { setFilter } from '../store/todoSlice';

const TodoFilter = () => {
  const dispatch = useDispatch();

  const [task, setTask] = React.useState<string>('');
  const [status, setStatus] = React.useState<string>('all');
  const todos = useSelector((state: RootState) => state.todos.todos);

  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleSearch = () => {
    dispatch(setFilter({ task, status }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: 2,
        mb: 3,
        width: '100%',
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ color: 'text.secondary' }}
      >
        <Icon icon="fluent:task-list-square-ltr-24-regular" width="28" height="28" />
        <Typography variant="subtitle1" fontWeight={500}>
          {completed} out of {total} Tasks Completed
        </Typography>
      </Stack>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          width: { xs: '100%', sm: 'auto' },
          justifyContent: 'flex-end',
        }}
      >
        <TextField
          size="small"
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
          sx={{ width: { xs: '100%', sm: 420 } }}
        />

        <Select
          size="small"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          variant="outlined"
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
        </Select>

        <Button
          variant="contained"
          color="primary"
          sx={{
            minWidth: 100,
            whiteSpace: 'nowrap',
            width: { xs: '100%', sm: 'auto' },
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Stack>
    </Box>
  );
};

export default TodoFilter;
