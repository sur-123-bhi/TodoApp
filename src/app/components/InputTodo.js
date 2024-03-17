"use client";

import React, { useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useDispatch } from "react-redux";
import { setTodos } from "../../redux/slices/todo-slice.js";

const InputTodo = () => {
  const [todo, setTodo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const dispatch = useDispatch();

  const handleSaveTodoInDatabase = async () => {
    await fetch("http://localhost:3000/api/todos", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        task: todo,
        duedate: dueDate,
      }),
    }).catch((error) => console.log(error));

    setTodo('');
    setDueDate('');

    // Fetch updated list of todos from the database
    try {
      const response = await fetch("http://localhost:3000/api/todos");
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const todoArr = await response.json();
      console.log('from fetch request     ',todoArr); // Check if you're receiving the todos array correctly
      dispatch(setTodos(todoArr.todos));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        display="flex"
        mb="4%"
        width="100%"
        gap="2%"
        justifyContent="space-between"
        alignItems="center"
      >
        <TextField
          label="Write todo here"
          color="secondary"
          focused
          fullWidth
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />

        <input
          type="date"
          value={dueDate}
          style={{
            padding: "3%",
            borderRadius: "5px",
            border: "2px solid #9c27b0",
            color: "white",
            outline: "none",
            width: "350px",
            backgroundColor: "#ba68c8",
          }}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </Box>

      <Box width="40%" mb="5%">
        <Button
          variant="contained"
          fullWidth
          sx={{
            py: "2.5%",
            bgcolor: "#ba68c8",
            "&:hover": { bgcolor: "#9c27b0" },
          }}
          onClick={handleSaveTodoInDatabase}
        >
          <AddBoxIcon sx={{ mr: "3%" }} />
          Add Todo
        </Button>
      </Box>
    </>
  );
};

export default InputTodo;
