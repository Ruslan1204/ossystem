import { contactsFilterAction, contactsAgeAction } from 'Redux/contacts.slice';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { ContactList } from '../ContactList/ContactList';
import { Navigation } from '../Navigation/Navigation';

export const Filter = ({ onChange }) => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);
  const age = useSelector(state => state.age);

  const changeFilter = evt => {
    const { value } = evt.target;
    console.log(value);
    dispatch(contactsFilterAction(value));
  };

  const changeAge = evt => {
    const { value } = evt.target;
    console.log(value);
    dispatch(contactsAgeAction(value));
  };

  return (
    <>
      <Navigation />
      <label>
        <p>Find Users by name or age</p>
        <input type="text" value={filter} onChange={changeFilter} />
        <input type="number" value={age} onChange={changeAge} />
      </label>

      <ContactList />
    </>
  );
};

Filter.propTypes = {
  // filter: PropTypes.string.isRequired,
  // onChange: PropTypes.func,
};
