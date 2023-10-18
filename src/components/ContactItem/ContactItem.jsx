// import PropTypes from 'prop-types';

import css from './ContactItem.module.css';

import * as React from 'react';

import TableCell from '@mui/material/TableCell';

import TableRow from '@mui/material/TableRow';

// import { useSelector } from 'react-redux';

import { useEffect, useState } from 'react';

import axios from 'axios';

export const ContactItem = ({ name, age, onDelete }) => {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('');

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
  }, [name, age]);

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

  return (
    <>
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
            <li className={css.item}>
              <span className={css.status}></span>
            </li>
          )}
        </TableCell>
        <TableCell align="right">
          <button type="button" onClick={onDelete}>
            Delete
          </button>
        </TableCell>
      </TableRow>
    </>
  );
};

// ContactItem.ropTypes = {
//   name: PropTypes.string.isRequired,
//   number: PropTypes.string.isRequired,
//   onDelete: PropTypes.func,
// };
