import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

export const Navigation = () => {
  return (
    <Link to=":id">
      <Button variant="contained" color="success">
        Add Users
      </Button>
    </Link>
  );
};
