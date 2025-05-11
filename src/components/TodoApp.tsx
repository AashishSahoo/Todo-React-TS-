import TodoFilter from './TodoFilter';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { Box } from '@mui/material';


const TodoApp = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', borderRadius: 2, height: "80vh" }}>
      <h1 >Todo Application using React and Typescript</h1>
      <TodoForm />
      <TodoFilter />
      <TodoList />

    </Box>
  );
}

export default TodoApp;
