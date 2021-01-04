import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../constants/colors';
import Image from '../Image';
import Text, {TextWeight} from '../Text';

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Avatar = ({src, alt, size}) => {
  const text = alt?.length > 1 ? alt.slice(0, 1) : alt;
  if (src) {
    return (
      <Image src={src} width={size} height={size} borderRadius={size / 2} />
    );
  }
  return (
    <LinearGradient
      start={{x: 0.0, y: 0.25}}
      end={{x: 0.5, y: 1.0}}
      locations={[0, 0.9]}
      colors={['rgb(10, 196, 186)', 'rgb(43, 218, 142)']}
      style={[
        styles.avatarContainer,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}>
      <Text weight={TextWeight.SEMIBOLD} color={colors.WHITE} size={size / 2}>
        {text}
      </Text>
    </LinearGradient>
  );
};

Avatar.defaultProps = {
  alt: 'T',
  size: 40,
};

export default Avatar;
