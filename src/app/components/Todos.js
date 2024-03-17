"use client";
import React, { useState } from "react";
import { Button, Typography, Box, Checkbox } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { handleModalStatus } from "../../redux/slices/modal-slice.js";
import { handleEditTodo } from "../../redux/slices/editModal-slice.js";
import { setTodos } from "../../redux/slices/todo-slice.js";
import { TodoModal } from "./TodoModal";
import { EditTodoModal } from "./EditTodoModal.js";

export const Todos = ({ todo }) => {
  const dispatch = useDispatch();
  const [checkedStatus, setCheckStatus] = useState(todo.completed);

  // Use useSelector to subscribe to Redux store state changes
  const open = useSelector((state) => state.modal.open);
  const selectedTodo = useSelector((state) => state.modal.selectedTodo);

  const editTodo = useSelector((state) => state.editmodal.editTodo);
  const editModalOpen = useSelector((state) => state.editmodal.editModalOpen);

  // Update checkedStatus when todo.completed changes in Redux store
  useState(() => {
    setCheckStatus(todo.completed);
  }, [todo.completed]);

  const handleSeeTodoBtnClicked = () => {
    dispatch(handleModalStatus({ open: true, todo: todo }));
    console.log("see more btn clicked");
    console.log(selectedTodo, "   ", open);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/todos");
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const todoArr = await response.json();
      dispatch(setTodos(todoArr.todos));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTodoBtn = () => {
    dispatch(handleEditTodo({ editModalOpen: true, editTodo: todo }));
  };

  const handleCheckBoxClick = async () => {
    const updatedStatus = !checkedStatus;
    setCheckStatus(updatedStatus);

    try {
      await fetch(
        `http://localhost:3000/api/todos/${todo.id}`,
        {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            completed: updatedStatus,
          }),
        }
      ).then(res => fetchData()).catch(error => console.log(error));
      
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async () => {
    await fetch(`http://localhost:3000/api/todos/${todo.id}`, {
      method: "DELETE",
    }).catch((error) => console.log(error));

    fetchData();
  };

  return (
    <>
      <Box
        bgcolor="rgb(210, 210, 210)"
        height="fit-content"
        mb="5%"
        p="3%"
        borderRadius="5px"
        display="flex"
        alignItems="center"
      >
        {/* <Checkbox
          checked={checkedStatus}
          color="secondary"
          onChange={handleCheckBoxClick}
        /> */}
        {/* {checkedStatus ? (
          <Typography
            variant="p"
            sx={{
              inlineSize: "100px",
              textDecoration: "line-through",
              overflow: "hidden",
            }}
          >
            {todo.task}
          </Typography>
        ) : ( */}
          <Typography
            variant="p"
            sx={{ inlineSize: "150px", overflow: "hidden" }}
          >
            {todo.task}
          </Typography>
         {/* )} */}
        <Button
          variant="contained"
          sx={{
            mr: "20%",
            ml:'5%',
            bgcolor: "#ba68c8",
            "&:hover": { bgcolor: "#9c27b0" },
          }}
          onClick={handleSeeTodoBtnClicked}
        >
          See Todo
        </Button>

        <Button
          variant="contained"
          sx={{
            py: "1.2%",
            mr: "5%",
            bgcolor: "#ba68c8",
            "&:hover": { bgcolor: "#9c27b0" },
          }}
          onClick={handleEditTodoBtn}
        >
          <EditIcon color="white" />
        </Button>
        <Button
          variant="contained"
          sx={{
            py: "1.2%",
            bgcolor: "#ba68c8",
            "&:hover": { bgcolor: "#9c27b0" },
          }}
          onClick={handleDeleteTodo}
        >
          <DeleteForeverIcon color="white" />
        </Button>
      </Box>
      {open && selectedTodo === todo && <TodoModal todo={selectedTodo} />}
      {editModalOpen && editTodo === todo && <EditTodoModal todo={editTodo} />}
    </>
  );
};
