import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Chip from '@mui/material/Chip';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, updateTodo } from '../store/todoSlice';
import type { Todo } from '../store/todoSlice';
import { selectFilteredTodos } from '../store/todoSlice';
// 

const paginationModel = { page: 0, pageSize: 5 };

const TodoList = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [selectedIdToDelete, setSelectedIdToDelete] = React.useState<number | null>(null);
  const [selectedTodo, setSelectedTodo] = React.useState<Todo | null>(null);

  const dispatch = useDispatch();
  const rows = useSelector(selectFilteredTodos);

  const handleDelete = () => {
    if (selectedIdToDelete !== null) {
      dispatch(deleteTodo(selectedIdToDelete));
    }
    setOpenDeleteDialog(false);
    setSelectedIdToDelete(null);
  };

  const handleEditSave = () => {
    if (selectedTodo) {
      dispatch(updateTodo(selectedTodo));
    }
    setOpenEditDialog(false);
    setSelectedTodo(null);
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 150,
      renderCell: (params: { row: Todo }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <span>{params.row.id}</span>
        </Box>
      )
    },
    {
      field: 'title',
      headerName: 'Task',
      width: 450,
      renderCell: (params: { row: Todo }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <span>{params.row.title}</span>
        </Box>
      )
    },
    {
      field: 'time',
      headerName: 'Time',
      width: 200,
      renderCell: (params: { row: Todo }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <span>{params.row.timeStamp}</span>
        </Box>
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      renderCell: (params: { row: Todo }) => (
        <Chip
          label={params.row.completed ? "Completed" : "Pending"}
          color={params.row.completed ? "success" : "warning"}
        />
      )
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params: { row: Todo }) => (
        <Box>
          <Tooltip title="Edit Task">
            <EditIcon
              onClick={() => {
                setSelectedTodo({ ...params.row });
                setOpenEditDialog(true);
              }}
              sx={{ color: 'blue', cursor: 'pointer' }}
            />
          </Tooltip>
          <Tooltip title="Delete Task">
            <DeleteIcon
              onClick={() => {
                setSelectedIdToDelete(params.row.id);
                setOpenDeleteDialog(true);
              }}
              sx={{ color: 'red', cursor: 'pointer', ml: 2 }}
            />
          </Tooltip>
        </Box>
      )
    }
  ];



  return (
    <>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
          hideFooterSelectedRowCount
          disableColumnSelector
          disableColumnMenu
          disableColumnFilter
          sx={{
            border: 0,
            '.MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            '.MuiDataGrid-columnHeader:focus': {
              outline: 'none',
            }
          }} />
      </Paper>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this task? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      \      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Task Name"
            fullWidth
            variant="outlined"
            margin="normal"
            value={selectedTodo?.title || ''}
            onChange={(e) =>
              selectedTodo &&
              setSelectedTodo({ ...selectedTodo, title: e.target.value } as Todo)
            }
          />
          <FormControlLabel
            control={
              <Switch
                checked={selectedTodo?.completed || false}
                onChange={(e) =>
                  selectedTodo &&
                  setSelectedTodo({ ...selectedTodo, completed: e.target.checked } as Todo)
                }
              />
            }
            label="Completed"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleEditSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TodoList;
