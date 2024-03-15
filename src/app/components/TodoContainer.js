"use client";

import React, { useState } from "react";
import { Button, Typography, Box, TextField, Checkbox } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Todos } from "./Todos";

export const TodoContainer = () => {
  const [todo, setTodo] = useState("");

  const [todoArr, setTodoArr] = useState([
    "todo1mdnfbasjhfwekjhfkjnskdjafncsjakhfwekuhfkdsjnfmcfnsdmcnskjehf",
    "todo2sdkafjakhgkjdshgfkajsdhgk;shda;gkhsa",
    "todo3djfakhkjsahhahfkdsjhfoiwauehfaoeiwufgshdfkjsdfiwohfjo",
  ]);

  const handleSaveTodoInDatabase = () => {};

  return (
    <Box
      component="section"
      display="flex"
      height="fit-content"
      m="auto"
      mt="5%"
      width="50vw"
      bgcolor="white"
      p="3%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      borderRadius="10px"
    >
      <Typography variant="h4" mb="10%">
        TODO APP
      </Typography>
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
        />

        <input
          type="date"
          style={{
            padding: "3%",
            borderRadius: "5px",
            border: "2px solid #9c27b0",
            color: "#9c27b0",
            outline: "none",
            width: "350px",
            backgroundColor:'white',
          }}
        />
      </Box>

      <Box width='50%' mb='5%'>
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

      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        height="fit-content"
      >
        {todoArr.length > 0 &&
          todoArr.map((todo, index) => {
            return (
              <Todos key={index} todo={todo}/>
            );
          })}
      </Box>
    </Box>
  );
};
