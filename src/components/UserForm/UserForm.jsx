// import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// import css from '../UserForm/UserForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addUserAction } from 'Redux/user.slice';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { UserEdit } from '../UserEdit';

import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import axios from 'axios';

export const UserForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [images, setImages] = useState('');
  const [status, setStatus] = useState('');

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  const img = Object.values(images);
  const st = Object.values(status);
  let colorHeir = '';

  if (age >= 45) {
    colorHeir = 'afafaf';
  } else {
    colorHeir = '562306';
  }

  useEffect(() => {
    const fetchData = async () => {
      // setIsLoading(true);
      try {
        const { config } = await axios.get(
          `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}&hairColor=${colorHeir}`
        );

        setImages({ images: config.url });
      } catch (error) {
        console.log(error);
      } finally {
        // setIsLoading(false);
      }
    };

    if (name !== '' && age !== '') {
      fetchData(name, age);
    }
  }, [name, age, colorHeir]);

  useEffect(() => {
    const fetchStatus = async () => {
      // setIsLoading(true);
      try {
        const { data } = await axios.get(`https://yesno.wtf/api`);

        // console.log(data.answer);
        setStatus({ status: data.answer });
      } catch (error) {
        console.log(error);
      } finally {
        // setIsLoading(false);
      }
    };

    if (name !== '' && age !== '') {
      fetchStatus(name, age);
    }
  }, [name, age]);

  const handleAddUsers = (name, age, img, st) => {
    const mapName = users
      .map(user => {
        return user.name;
      })
      .join('')
      .includes(name);

    if (!mapName) {
      dispatch(addUserAction(name, age, img, st));
    } else {
      return alert(`${name} is already in users.`);
    }
  };

  const handleChangeForm = evt => {
    const { name, value } = evt.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'age':
        setAge(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    handleAddUsers(name, age, img, st);

    // console.log('UserForm', users);

    setName('');
    setAge('');
    setImages([]);
    setStatus('');

    navigate('/');
  };

  return (
    <div>
      <Link to="/">
        <Box sx={{ '& > button': { m: 1 } }}>
          <Button variant="outlined" color="success" margin="dense">
            Go to back
          </Button>
        </Box>
      </Link>
      <h2>Create your user</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={handleChangeForm}
          autocomplete="off"
          color="success"
          fullWidth
          margin="normal"
          id="fullWidth"
          label="Name"
          value={name}
          variant="outlined"
          name="name"
          sx={{ mr: 3 }}
        />
        <TextField
          onChange={handleChangeForm}
          autocomplete="off"
          color="success"
          fullWidth
          id="fullWidth"
          label="Age"
          value={age}
          variant="outlined"
          name="age"
          sx={{ mr: 3 }}
        />

        <Box sx={{ '& > button': { m: 1 } }}>
          <Button variant="contained" color="success" type="submit">
            Add User
          </Button>
        </Box>
      </form>

      {name !== '' && age !== '' && <img src={img} alt="avatar" width={100} height={100} />}
      {/* {st.join('') === 'yes' && (
        <li className={css.item}>
          <span className={css.status}></span>
        </li>
      )} */}

      <UserEdit />
    </div>
  );
};
