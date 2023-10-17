import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import css from '../ContactForm/ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContactsAction } from 'Redux/contacts.slice';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';


export const ContactForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [age, setnumber] = useState('');
  const [images, setImages] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);

  const fetchData = async () => {
    // setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}&hairColor=afafaf`
      );

      console.log(data);
      
    } catch (error) {
      console.log(error);
    } finally {
      // setIsLoading(false);
    }
  };

  fetchData();

  // useEffect(() => {
  //   if (name !== '' && age !== '') {
  //     fetchData(name, age);
  //   }
  // }, [name, age]);

  const handleAddContacts = (name, age) => {
    const mapName = contacts
      .map(contact => {
        return contact.name;
      })
      .join('')
      .includes(name);
    if (!mapName) {
      dispatch(addContactsAction(name, age));
    } else {
      return alert(`${name} is already in contacts.`);
    }
  };

  const handleChangeForm = evt => {
    const { name, value } = evt.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'age':
        setnumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    // onAdd(name, number);
    handleAddContacts(name, age);
    setName('');
    setnumber('');

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
    </div>
  );
};

// ContactForm.propTypes = {
//   onAdd: PropTypes.func,
// };

//   state = {
//     name: '',
//     number: '',
//   };

//   handleChangeForm = evt => {
//     const { name, value } = evt.target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     const { name, number} = this.state;

//     this.props.onAdd(name, number);

//     this.setState({ name: '', number: '' });
//   };

//   render() {
//     const { name, number } = this.state;
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <label>
//             <p>Name</p>
//             <input
//               onChange={this.handleChangeForm}
//               type="text"
//               name="name"
//               value={name}
//               pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//               title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//               required
//             />
//           </label>

//           <label>
//             <p>Number</p>
//             <input
//               onChange={this.handleChangeForm}
//               type="tel"
//               name="number"
//               value={number}
//               pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//               title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//               required
//             />
//           </label>
//           <button className={css.bloc} type="submit">Add contact</button>
//         </form>
//       </div>
//     );
//   }
// }
