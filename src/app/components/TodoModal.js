import { Box, Button, Typography, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleModalStatus } from "@/redux/slices/modal-slice";

export const TodoModal = ({todo}) => {
  const dispatch = useDispatch();
  const open = useSelector(state => state.modal.open);
  console.log(`I am from modal ${open}`);

  const handleClose = () => {
    dispatch(handleModalStatus(false));
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
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
        
        <Typography  sx={{ mt: 2, wordBreak:'break-word' }}>
          {todo}
        </Typography>
        <Button sx={{border:'1px solid #9c27b0', color:'#9c27b0', mt:'5%'}} onClick={handleClose}>Close</Button>
      </Box>
    </Modal>
  );
};
