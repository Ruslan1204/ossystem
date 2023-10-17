import { ContactForm } from '../components/ContactForm/ContactForm';

import { Filter } from '../components/Filter/Filter';
import css from '../components/App.module.css';
// import { useDispatch} from 'react-redux';
import // addContactsAction,
// contactsDeleteAction,
// contactsFilterAction,
'Redux/contacts.slice';
// import { contactsFilterAction } from 'Redux/filter.slice';

import { Routes, Route } from 'react-router';

export const App = () => {
  return (
    <div className={css.container}>
      <h1>SPA application</h1>

      <Routes>
        <Route path="/" element={<Filter />} />
        <Route path="/user" element={<ContactForm />} />
      </Routes>
    </div>
  );
};

// {/* onAdd={handleAddContacts} */}
// {/* onChange={changeFilter}  */}
// {/* onDelete={handleDeleteContact}  */}

// const dispatch = useDispatch();

// const filter = useSelector(state => state.filter);
// const contacts = useSelector(state => state.contacts);

// const handleDeleteContact = id => {
//   dispatch(contactsDeleteAction(id));
// };

// const handleAddContacts = (name, number) => {
//   const mapName = contacts.map(contact => {
//       return contact.name;
//     })
//     .join('')
//     .includes(name);
//   if (!mapName) {
//     dispatch(addContactsAction(name, number));
//   } else {
//     return alert(`${name} is already in contacts.`);
//   }
// };

// const changeFilter = evt => {
//   const { value } = evt.target;
//   dispatch(contactsFilterAction(value));
// };

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts =
//       JSON.parse(localStorage.getItem('contacts')) || localContacts;
//     this.setState({ contacts });
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { contacts } = this.state;

//     if (prevState.contacts !== contacts) {
//       localStorage.setItem('contacts', JSON.stringify(contacts));
//     }
//   }

//   handleDeleteContact = id => {
//     this.setState(prevState => {
//       const newContactsList = prevState.contacts.filter(
//         contact => contact.id !== id
//       );
//       return { contacts: newContactsList };
//     });
//   };

//   handleAddContacts = (name, number) => {
//     const contact = { id: nanoid(), name, number };

//     const mapName = this.state.contacts
//       .map(contact => {
//         return contact.name;
//       })
//       .join(' ')
//       .includes(contact.name);

//     if (!mapName) {
//       this.setState(prevState => ({
//         contacts: [contact, ...prevState.contacts],
//       }));
//     } else {
//       return alert(`${name} is already in contacts.`);
//     }
//   };

//   changeFilter = evt => {
//     const { value } = evt.target;

//     this.setState({ filter: value });
//   };

//   getVisibleContacts = () => {
//     const { contacts, filter } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   render() {
//     const { filter } = this.state;

//     const visibleContacts = this.getVisibleContacts();

//     return (
//       <div className={css.container}>
//         <h1>Phonebook</h1>
//         <ContactForm onAdd={this.handleAddContacts} />

//         <h2>Contacts</h2>
//         <Filter filter={filter} onChange={this.changeFilter} />
//         <ContactList
//           contacts={visibleContacts}
//           onDelete={this.handleDeleteContact}
//         />
//       </div>
//     );
//   }
// }
