"use client";

import React from "react";
import { Button, Typography, Box, Checkbox } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { handleModalStatus } from "@/redux/slices/modal-slice";
import { TodoModal } from "./TodoModal";

export const Todos = ({ todo }) => {
  const dispatch = useDispatch();
  const open = useSelector(state => state.modal.open);

  const handleSeeTodoBtnClicked = () => {
    dispatch(handleModalStatus(true));
    console.log('action dispatched');
  }

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
      <Checkbox color="secondary" />
      <Typography variant="p" sx={{ inlineSize: "100px", overflow: "hidden" }}>
        {todo}
      </Typography>
      <Typography variant="p" mr="2%">
        ...
      </Typography>
      <Button
        variant="contained"
        sx={{
          mr: "25%",
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
      >
        <DeleteForeverIcon color="white" />
      </Button>
    </Box>
    {open && <TodoModal todo={todo}/>}
    </>
  );
};
