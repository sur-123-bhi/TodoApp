import { Box, Button, Typography, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {handleModalStatus} from '../../redux/slices/modal-slice.js';


export const TodoModal = ({todo}) => {

  const dispatch = useDispatch();
  const open = useSelector(state => state.modal.open);
  console.log(`I am from modal ${open}`);

  const handleClose = () => {
    dispatch(handleModalStatus(false));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{width:'100%', display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography>Created Date: {formatDate(todo.createdat)}</Typography>
          <Typography>Due Date: {formatDate(todo.duedate)}</Typography>
        </Box>
        <Typography  sx={{ mt: 2, wordBreak:'break-word' }}>
          {todo.task}
        </Typography>
        <Button sx={{border:'1px solid #9c27b0', color:'#9c27b0', mt:'5%'}} onClick={handleClose}>Close</Button>
      </Box>
    </Modal>
  );
};
