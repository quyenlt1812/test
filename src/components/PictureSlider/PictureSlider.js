import React, {useState} from 'react';
import Carousel from 'react-native-snap-carousel';
import {Dimensions} from 'react-native';
import uuid from 'react-native-uuid';
import colors from '../../constants/colors';
import Box from '../Box';
import PictureSliderItem from '../PictureSliderItem';
import {useSelector} from 'react-redux';
import {getRewards} from '../../services/Reward/selectors';

const images = [
  {
    id: uuid.v4(),
    image: require('../../assets/images/banner-1.jpg'),
    points: 180,
    name: 'One year unlimited access membership',
    departure: 'CGV Cinema',
    logo: require('../../assets/images/cgv-logo.png'),
    cover: require('../../assets/images/cgv-2.jpeg'),
  },
  {
    id: uuid.v4(),
    image: require('../../assets/images/banner-2.jpg'),
    points: 150,
    name: 'One year unlimited access membership',
    departure: 'Grab',
    logo: require('../../assets/images/grab-logo.png'),
    cover: require('../../assets/images/grab-2.jpg'),
  },
  {
    id: uuid.v4(),
    image: require('../../assets/images/banner-3.jpeg'),
    points: 300,
    name: 'One year unlimited access membership',
    departure: 'Highlands Coffee',
    logo: require('../../assets/images/highlands-logo.png'),
    cover: require('../../assets/images/highlands-2.jpg'),
  },
];

const WIDTH = Dimensions.get('window').width;

const PictureSlider = ({}) => {
  const rewards = useSelector(getRewards);
  const [activeItem, setActiveItem] = useState(0);
  const _renderItem = ({item}) => {
    return <PictureSliderItem key={item.image} {...item} />;
  };

  const list = rewards ? rewards?.slice(0, 3) : images;

  return (
    <Box>
      <Carousel
        loop
        useScrollView
        data={list}
        renderItem={_renderItem}
        sliderWidth={WIDTH}
        itemWidth={WIDTH}
        sliderHeight={180}
        itemHeight={180}
        onSnapToItem={(index) => setActiveItem(index)}
      />
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        mt={10}>
        {[...new Array(3)].map((_, index) => (
          <Box
            key={index}
            mx={6}
            width={8}
            height={8}
            borderRadius={4}
            backgroundColor={
              index === activeItem ? colors.PRIMARY : colors.LIGHTGRAY
            }
          />
        ))}
      </Box>
    </Box>
  );
};

export default PictureSlider;
