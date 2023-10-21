// import { usersFilterAction, usersAgeAction } from 'Redux/user.slice';
// // import PropTypes from 'prop-types';
// import { useDispatch, useSelector } from 'react-redux';

// import { UserList } from '../UserList/UserList';
// import { Navigation } from '../Navigation/Navigation';

// export const Filter = ({ onChange }) => {
//   const dispatch = useDispatch();
//   const filter = useSelector(state => state.filter);
//   const age = useSelector(state => state.age);

//   const changeFilter = evt => {
//     const { value } = evt.target;

//     dispatch(usersFilterAction(value));
//   };

//   const changeAge = evt => {
//     const { value } = evt.target;

//     dispatch(usersAgeAction(value));
//   };

//   return (
//     <>
//       <Navigation />
//       <label>
//         <p>Find Users by name or age</p>
//         <input type="text" value={filter} onChange={changeFilter} />
//         <input type="number" value={age} onChange={changeAge} />
//       </label>

//       {/* <UserList /> */}
//     </>
//   );
// };

// Filter.propTypes = {
//   // filter: PropTypes.string.isRequired,
//   // onChange: PropTypes.func,
// };
