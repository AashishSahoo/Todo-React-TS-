import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  deleteTodo,
  updateTodo,
  selectFilteredTodos,
  type Todo,
} from "../store/todoSlice";

const TodoList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [selectedIdToDelete, setSelectedIdToDelete] = React.useState<number | null>(null);
  const [selectedTodo, setSelectedTodo] = React.useState<Todo | null>(null);

  const [orderBy, setOrderBy] = React.useState<"timeStamp" | null>(null);
  const [orderDirection, setOrderDirection] = React.useState<"asc" | "desc">("asc");

  const dispatch = useDispatch();
  const rows = useSelector(selectFilteredTodos);

  const handleSort = (column: "timeStamp") => {
    const isAsc = orderBy === column && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  const sortedRows = React.useMemo(() => {
    if (!orderBy) return rows;
    return [...rows].sort((a, b) => {
      const aTime = moment(a.timeStamp).valueOf();
      const bTime = moment(b.timeStamp).valueOf();
      return orderDirection === "asc" ? aTime - bTime : bTime - aTime;
    });
  }, [rows, orderBy, orderDirection]);

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

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "8%", fontWeight: 600, backgroundColor: "#f8f9fa" }}>ID</TableCell>
              <TableCell sx={{ width: "45%", fontWeight: 600, backgroundColor: "#f8f9fa" }}>Task</TableCell>
              <TableCell
                sx={{
                  width: "20%",
                  fontWeight: 600,
                  backgroundColor: "#f8f9fa",
                  cursor: "pointer",
                  userSelect: "none",
                }}
                onClick={() => handleSort("timeStamp")}
              >
                Time{" "}
                <Icon
                  icon={
                    orderBy === "timeStamp"
                      ? orderDirection === "asc"
                        ? "mdi:arrow-up"
                        : "mdi:arrow-down"
                      : "mdi:unfold-more-horizontal"
                  }
                  style={{ fontSize: "18px", verticalAlign: "middle" }}
                />
              </TableCell>
              <TableCell sx={{ width: "15%", fontWeight: 600, backgroundColor: "#f8f9fa" }}>Status</TableCell>
              <TableCell sx={{ width: "12%", fontWeight: 600, backgroundColor: "#f8f9fa" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4, color: "text.secondary" }}>
                  No rows found
                </TableCell>
              </TableRow>
            ) : (
              sortedRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={row.id}
                    hover
                    sx={{
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "rgba(0,0,0,0.02)" },
                    }}
                  >
                    <TableCell sx={{ width: "8%" }}>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell
                      sx={{
                        width: "45%",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <Tooltip title={row.title.length > 60 ? row.title : ""}>
                        <span>{row.title.length > 60 ? row.title.slice(0, 60) + "..." : row.title}</span>
                      </Tooltip>
                    </TableCell>
                    <TableCell sx={{ width: "20%" }}>
                      {moment(row.timeStamp).format("D/M/YYYY, h:mm A")}
                    </TableCell>
                    <TableCell sx={{ width: "15%" }}>
                      <Chip
                        label={row.completed ? "Completed" : "Pending"}
                        color={row.completed ? "success" : "warning"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell sx={{ width: "12%" }}>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Tooltip title="Edit Task">
                          <Icon
                            icon="mdi:pencil"
                            style={{ color: "#1976d2", cursor: "pointer", fontSize: "20px" }}
                            onClick={() => {
                              setSelectedTodo({ ...row });
                              setOpenEditDialog(true);
                            }}
                          />
                        </Tooltip>
                        <Tooltip title="Delete Task">
                          <Icon
                            icon="mdi:delete"
                            style={{ color: "#d32f2f", cursor: "pointer", fontSize: "20px" }}
                            onClick={() => {
                              setSelectedIdToDelete(row.id);
                              setOpenDeleteDialog(true);
                            }}
                          />
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>


        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <Box sx={{ textAlign: "center", p: 3 }}>
          <Avatar sx={{ margin: "0 auto", bgcolor: "#ffebee", width: 60, height: 60, mb: 1 }}>
            <Icon icon="mdi:delete" style={{ fontSize: 40, color: "#d32f2f" }} />
          </Avatar>
          <DialogTitle>Delete Task</DialogTitle>
          <DialogContent>Are you sure you want to delete this task? This action cannot be undone.</DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={() => setOpenDeleteDialog(false)} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error" variant="outlined">
              Delete
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <Box sx={{ textAlign: "center", p: 3 }}>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            <TextField
              label="Task Name"
              fullWidth
              variant="outlined"
              margin="normal"
              value={selectedTodo?.title || ""}
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
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={() => setOpenEditDialog(false)} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleEditSave} color="primary" variant="outlined">
              Save
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default TodoList;
