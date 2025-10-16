import { Box, Typography, Card, CardContent, Divider } from '@mui/material';
import TodoFilter from './TodoFilter';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { Icon } from "@iconify/react";

const TodoApp = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Card
        elevation={4}
        sx={{
          width: { xs: '95%', md: '100%' },
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            py: 3,
            px: { xs: 3, md: 4 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >

            <Icon icon="fluent:calendar-todo-32-light" width="32" height="32" />
            <Typography
              variant="h5"
              fontWeight={600}
              component="span"
            >
              Task Manager
            </Typography>
          </Box>

          <Typography
            variant="subtitle1"
            textAlign="center"
            sx={{ opacity: 0.9 }}
          >
            Manage your daily goals efficiently!
          </Typography>
        </Box>

        <CardContent sx={{ p: { xs: 2, md: 4 } }}>

          <TodoForm />
          <Divider sx={{ my: 3 }} />
          <TodoFilter />
          <TodoList />
        </CardContent>
      </Card>
    </Box>
  );
};

export default TodoApp;
