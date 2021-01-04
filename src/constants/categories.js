import uuid from 'react-native-uuid';

export const CATEGORIES = [
  {
    id: uuid.v4(),
    name: 'travel',
    image: require('../assets/images/travel.png'),
  },
  {
    id: uuid.v4(),
    name: 'family',
    image: require('../assets/images/family.png'),
  },
  {
    id: uuid.v4(),
    name: 'food',
    image: require('../assets/images/food.png'),
  },
  {
    id: uuid.v4(),
    name: 'fitness',
    image: require('../assets/images/fitness.png'),
  },
  {
    id: uuid.v4(),
    name: 'learning',
    image: require('../assets/images/learning.png'),
  },
  {
    id: uuid.v4(),
    name: 'lifestyle',
    image: require('../assets/images/lifestyle.png'),
  },
];
