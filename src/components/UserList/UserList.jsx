// import PropTypes from 'prop-types';
import css from '../UserList/UserList.module.css';
import { UserItem } from '../UserItem/UsertItem';
// import { UserEdit } from '../UserEdit';

import { useDispatch, useSelector } from 'react-redux';
import { userDeleteAction } from 'Redux/user.slice';

import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { usersFilterAction, usersAgeAction } from 'Redux/user.slice';
import { Navigation } from '../Navigation/Navigation';

export const UserList = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);
  const users = useSelector(state => state.users);
  const age = useSelector(state => state.age);

  const [status, setStatus] = useState('');
  const [images, setImages] = useState([]);
  const img = Object.values(images);
  const st = Object.values(status);
  const navigate = useNavigate();

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

  const handleDeleteUser = id => {
    dispatch(userDeleteAction(id));
  };

  const handleClickEdit = () => {
    navigate('/:id/edit');
  };

  const filterUsers = users.filter(user => {
    return user.name.toLowerCase().includes(filter.toLowerCase()) && user.age.includes(age);
  });

  // console.log('UserList', users);

  return (
    <>
      <Navigation />
      <label>
        <p>Find Users by name or age</p>
        <input type="text" value={filter} onChange={changeFilter} />
        <input type="number" value={age} onChange={changeAge} />
      </label>

      <TableHead className={css.list}>
        <TableRow>
          <TableCell>Avatar</TableCell>
          <TableCell align="right">Name</TableCell>
          <TableCell align="right">Age</TableCell>
          <TableCell align="right">Status</TableCell>
        </TableRow>
      </TableHead>

      {filterUsers.map(({ id, name, age, img, st }) => {
        const deleteUser = () => {
          handleDeleteUser(id);
        };
        return (
          <TableRow key={name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            {
              <TableCell component="th" scope="row">
                <img src={img} alt="avatar" />
              </TableCell>
            }
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
              <button type="button" onClick={deleteUser}>
                Delete
              </button>
              <button to="/:id/edit" onClick={handleClickEdit}>
                Edit
              </button>
            </TableCell>
            {/* <UserEdit id={id} /> */}
          </TableRow>
        );
      })}
    </>
  );
};

{
  /* <UserItem key={id} id={id} name={name} age={age} onDelete={deleteUser} />; */
}

// ContactList.propTypes = {
//   // contacts: PropTypes.array.isRequired,
//   // onDelete: PropTypes.func.isRequired,
// };

{
  /* <UserItem key={id} id={id} name={name} age={age} onDelete={deleteUser} />; */
}
