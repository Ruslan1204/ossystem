import { UserList } from '../components/UserList/UserList';

import Container from '@mui/material/Container';

export default function Users() {
  return (
    <main>
      <Container maxWidth="sm">
        <UserList />
      </Container>
    </main>
  );
}
