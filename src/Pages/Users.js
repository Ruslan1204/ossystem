import { UserList } from '../components/UserList/UserList';
// import { Navigation } from "../components/Navigation/Navigation";

// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
// import { Navigate } from 'react-router-dom';

export const Users = () => {
  return (
    <main>
      <Container maxWidth="sm">
        <UserList />
      </Container>
    </main>
  );
};
