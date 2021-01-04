import uuid from 'react-native-uuid';
import Recognition from './recognition';

export const HOME = [
  {
    id: uuid.v4(),
    badge: Recognition.Badges[0],
    image: Recognition.Type.PROBLEM_CRACKER,
    message:
      'Great job, Stina! Your team performance last quarter was truly awesome.',
    receiver: {
      name: 'Stina Nguyen',
      avatar: require('../assets/images/girl_1.png'),
    },
    sender: {
      name: 'Tram Tran',
      avatar: require('../assets/images/tramtran.png'),
    },
    points: 50,
    createdAt: new Date(),
  },
  {
    id: uuid.v4(),
    badge: Recognition.Badges[3],
    image: Recognition.Type.PASSION_FUELER,
    message:
      'It’s been awesome to work with Pawel Gorski and watch him jump into every project with curiosity, gratitude and an infectiously upbeat attitude.',
    receiver: {
      name: 'Pawel Gorski',
      avatar: require('../assets/images/pawel.png'),
    },
    sender: {
      name: 'Toby Scregg',
      avatar: require('../assets/images/toby.png'),
    },
    points: 20,
    createdAt: new Date(),
  },
];

export const REWARDS = [
  {
    id: uuid.v4(),
    name: 'One year unlimited access membership',
    points: 2000,
    departure: 'California Fitness & Yoga',
    image: require('../assets/images/cali.png'),
    logo: require('../assets/images/cali-logo.png'),
    cover: require('../assets/images/cali-2.jpg'),
  },
  {
    id: uuid.v4(),
    name: 'Two pairs of premium prescription glasses',
    points: 1700,
    departure: 'Oscar Wylee Eyewear',
    image: require('../assets/images/oscar.png'),
    logo: require('../assets/images/ow-logo.png'),
    cover: require('../assets/images/ow-2.jpg'),
  },
  {
    id: uuid.v4(),
    name: '30% discount on all drinks',
    points: 500,
    departure: 'Starbucks',
    image: require('../assets/images/starbucks.png'),
    logo: require('../assets/images/starbucks-logo.png'),
    cover: require('../assets/images/starbucks-2.jpg'),
  },
  {
    id: uuid.v4(),
    name: '50% discount on drink and popcorn combo',
    points: 700,
    departure: 'CGV Cinema',
    image: require('../assets/images/cgv.png'),
    logo: require('../assets/images/cgv-logo.png'),
    cover: require('../assets/images/cgv-2.jpeg'),
  },
  {
    id: uuid.v4(),
    name: 'Healthcare services for baby at home',
    points: 3700,
    departure: 'VinMec International',
    image: require('../assets/images/vinmec.png'),
    logo: require('../assets/images/vinmec-logo.png'),
    cover: require('../assets/images/vinmec-2.png'),
  },
  {
    id: uuid.v4(),
    name: 'Outdoor yoga beginner course ',
    points: 700,
    departure: 'Yoga Living',
    image: require('../assets/images/yoga.png'),
    logo: require('../assets/images/cali-logo.png'),
    cover: require('../assets/images/yoga-2.jpg'),
  },
];
