import axios from 'axios';

export const fetchData = async () => {
  const { data } = await axios.get(
    'https://api.dicebear.com/7.x/adventurer/svg?seed=ruslan&hairColor=#fff'
  );
  console.log(data);
};
fetchData();
