// import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import css from '../UserForm/UserForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addUserAction } from 'Redux/user.slice';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { UserEdit } from '../UserEdit';

import axios from 'axios';

import { useParams } from "react-router-dom";

export const UserForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [images, setImages] = useState('');
  const [status, setStatus] = useState('');
  
  const { id } = useParams();


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

      case 'images':
        setImages(value);
        break;

      case 'status':
        setStatus(value);
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
      <Link to="/">Go to back</Link>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Name</p>
          <input
            onChange={handleChangeForm}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <label>
          <p>Age</p>
          <input
            onChange={handleChangeForm}
            type="text"
            name="age"
            value={age}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>

        <button className={css.bloc} type="submit">
          Add User
        </button>
      </form>

      {name !== '' && age !== '' && <img src={img} alt="avatar" width={100} height={100} />}
      {st.join('') === 'yes' && (
        <li className={css.item}>
          <span className={css.status}></span>
        </li>
      )}

      <UserEdit />
    </div>
  );
};
