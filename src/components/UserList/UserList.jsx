
import css from '../UserList/UserList.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { userDeleteAction } from 'Redux/user.slice';

import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

import { IconButton, TextField, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import axios from 'axios';

import { usersFilterAction, usersAgeAction } from 'Redux/user.slice';

import { Loader } from '../Loader/Loader';

export const UserList = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);
  const users = useSelector(state => state.users);
  const age = useSelector(state => state.age);

  const [isLoading, setIsLoading] = useState(false);

  const [status, setStatus] = useState('');
  const [images, setImages] = useState([]);

  const changeFilter = evt => {
    const { value } = evt.target;

    dispatch(usersFilterAction(value));
  };

  const changeAge = evt => {
    const { value } = evt.target;

    dispatch(usersAgeAction(value));
  };

  let name = users.map(user => {
    return user.name;
  });

  let colorHeir = '';

  if (age >= 45) {
    colorHeir = 'afafaf';
  } else {
    colorHeir = '562306';
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { config } = await axios.get(
          `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}&hairColor=${colorHeir}`
        );

        setImages({ images: config.url });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (name !== '' && age !== '') {
      fetchData(name, age);
    }
  }, [name, age, colorHeir]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const { data } = await axios.get(`https://yesno.wtf/api`);

        setStatus({ status: data.answer });
      } catch (error) {
        console.log(error);
      } finally {
      }
    };

    if (name !== '' && age !== '') {
      fetchStatus(name, age);
    }
  }, [name, age]);

  const handleDeleteUser = id => {
    dispatch(userDeleteAction(id));
  };

  const filterUsers = users.filter(user => {
    return user.name.toLowerCase().includes(filter.toLowerCase()) && user.age.includes(age);
  });

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  return (
    <>
      <label>
        <p>Find Users by name or age</p>
        <TextField
          autocomplete="off"
          color="success"
          fullWidth
          margin="normal"
          onChange={changeFilter}
          id="fullWidth"
          label="Name"
          value={filter}
          variant="outlined"
          name="name"
          sx={{ mr: 3 }}
        />
        <TextField
          autocomplete="off"
          color="success"
          fullWidth
          onChange={changeAge}
          id="fullWidth"
          label="Age"
          value={age}
          variant="outlined"
          name="name"
          sx={{ mr: 3 }}
        />
      </label>
      <Container maxWidth="sm">
        <TableHead>
          <TableRow>
            <TableCell align="right">#</TableCell>
            <TableCell>Avatar</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Delete</TableCell>
            <TableCell align="right">Edit</TableCell>
          </TableRow>
        </TableHead>
        {filterUsers.map(({ id, name, age, img, st }, index) => {
          const deleteUser = () => {
            handleDeleteUser(id);
          };
          return (
            <>
              {isLoading && <Loader />}
              <TableRow key={name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="right">{index + 1}</TableCell>
                <TableCell component="th" scope="row">
                  <ButtonBase sx={{ width: 50, height: 50 }}>
                    <Img src={img} alt="avatar" />
                  </ButtonBase>
                </TableCell>
                <TableCell align="right">{name}</TableCell>
                <TableCell align="right">{age}</TableCell>
                <TableCell align="right">
                  {st.join('') === 'yes' && (
                    <li className={css.wrapper}>
                      <span className={css.status}></span>
                    </li>
                  )}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    type="button"
                    onClick={deleteUser}
                    color="success"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <NavLink to={`${id}`} className={css.link}>
                    <IconButton aria-label="edit" type="button" color="success">
                      <EditIcon />
                    </IconButton>
                  </NavLink>
                </TableCell>
              </TableRow>
            </>
          );
        })}
      </Container>
    </>
  );
};
