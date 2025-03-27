import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { doLogin, updateOpenLogin } from '../redux/authenSlice/AuthenSlice';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function Login() {
  const dispatch = useDispatch();
  const open = useSelector(state => state.authenSlice.isOpenLogin)
  
  const [formLogin,setFormLogin] = React.useState({
    userName:'',
    password:'',
  })
  const handleClickOpen = () => {
    dispatch(updateOpenLogin(true))
  };
  const handleClose = () => {
    dispatch(updateOpenLogin(false))
  };
  const handleSubmit = () => {
    console.log(formLogin);
    dispatch(doLogin(formLogin));
  }
  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormLogin({
    ...formLogin,
    [name]:value,
    })
  }

  return (
    <React.Fragment>
    <AccountCircleIcon onClick={handleClickOpen}/>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle className='text-center' sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Login
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers className='flex flex-col gap-1'>
          <div>
            <Box sx={{ width: 500, maxWidth: '100%' }}>
            <TextField onChange={handleChange} type='text' fullWidth label="User Name" id="userName" name="userName" />
            </Box>
          </div>
          <div>
            <Box sx={{ width: 500, maxWidth: '100%' }}>
            <TextField onChange={handleChange} type='password' fullWidth label="Password" id="password" name='password' />
            </Box>  
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=> handleSubmit()}>
            Đăng nhập
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
