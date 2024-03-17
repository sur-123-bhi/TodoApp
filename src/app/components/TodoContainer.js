"use client";

import React, { useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { Todos } from "./Todos";
import InputTodo from './InputTodo';
import { useSelector, useDispatch } from "react-redux";
import { setTodos } from "../../redux/slices/todo-slice";
import { handleLoadStatus } from "../../redux/slices/loadingModal-slice";

export const TodoContainer = () => {

  const todoArr = useSelector(state => state.todo.todos);
  const loadingStatus = useSelector(state => state.load.loading);
  const dispatch = useDispatch();

  const fetchData = async () => {
    dispatch(handleLoadStatus(true));
    try {
      const response = await fetch("http://localhost:3000/api/todos");
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const todoArr = await response.json();
      dispatch(handleLoadStatus(false));
      console.log('from fetch request     ',todoArr); // Check if you're receiving the todos array correctly
      dispatch(setTodos(todoArr.todos));
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

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

      <InputTodo />
      
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        height="fit-content"
      >
        {loadingStatus ? <Typography variant="h4" sx={{m: 'auto', mt:'5%'}}>Loading ...</Typography> : 
          todoArr.map((todo, index) => {
            return (
              <Todos key={index} todo={todo}/>
            );
          })}
      </Box>
    </Box>
  );
};
