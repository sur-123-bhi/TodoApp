"use client";

import { Box, Button, Modal, TextField, Snackbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleEditTodo } from "../../redux/slices/editModal-slice.js";
import { handleLoadStatus } from "../../redux/slices/editModal-slice.js";
import { useState } from "react";
import { setTodos } from "../../redux/slices/todo-slice.js";

export const EditTodoModal = ({ todo }) => {

  const [updatedTodo, setUpdatedTodo] = useState(todo.task);
  const [updatedDueDate, setUpdatedDueDate] = useState(todo.duedate);

  const dispatch = useDispatch();
  const editModalOpen = useSelector((state) => state.editmodal.editModalOpen);

  const handleClose = () => {
    dispatch(handleEditTodo(false));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleUpdateTodoInDatabase = async () => {
    dispatch(handleLoadStatus(true));
    await fetch(`http://localhost:3000/api/todos/${todo.id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        task: updatedTodo,
        duedate: updatedDueDate,
      }),
    }).catch((error) => console.log(error));

    try {
      const response = await fetch("http://localhost:3000/api/todos");
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const todoArr = await response.json();
      console.log("from fetch request     ", todoArr); // Check if you're receiving the todos array correctly
      dispatch(setTodos(todoArr.todos));
    } catch (error) {
      console.log(error);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={editModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          display="flex"
          mb="4%"
          width="100%"
          gap="4%"
          justifyContent="space-between"
          alignItems="center"
        >
          <TextField
            label="Write todo here"
            color="secondary"
            focused
            fullWidth
            onChange={(e) => setUpdatedTodo(e.target.value)}
            value={updatedTodo}
          />

          <input
            type="date"
            value={formatDate(updatedDueDate)}
            style={{
              padding: "4%",
              borderRadius: "5px",
              border: "2px solid #9c27b0",
              color: "white",
              outline: "none",
              width: "350px",
              backgroundColor: "#ba68c8",
            }}
            onChange={(e) => setUpdatedDueDate(e.target.value)}
          />
        </Box>

        <Box width="40%" m="auto" mb="5%" mt="8%">
          <Button
            variant="contained"
            fullWidth
            sx={{
              py: "2.5%",

              bgcolor: "#ba68c8",
              "&:hover": { bgcolor: "#9c27b0" },
            }}
            onClick={handleUpdateTodoInDatabase}
          >
            Update Todo
          </Button>
        </Box>
        <Button
          sx={{ border: "1px solid #9c27b0", color: "#9c27b0", mt: "5%" }}
          onClick={handleClose}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};
