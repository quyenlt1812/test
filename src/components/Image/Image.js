import React from 'react';
import FastImage from 'react-native-fast-image';

const Image = ({
  src,
  width,
  height,
  borderRadius,
  m,
  mt,
  mb,
  ml,
  mr,
  mx,
  my,
  p,
  pt,
  pb,
  pl,
  pr,
  px,
  py,
  style,
  ...rest
}) => {
  const source =
    typeof src === 'string'
      ? {
          uri: src,
          cached: true,
        }
      : src;

  return (
    <FastImage
      source={source}
      style={[
        width ? {width} : {},
        height ? {height} : {},
        borderRadius ? {borderRadius} : {},
        m ? {margin: m} : {},
        mt ? {marginTop: mt} : {},
        mb ? {marginBottom: mb} : {},
        ml ? {marginLeft: ml} : {},
        mr ? {marginRight: mr} : {},
        mx ? {marginHorizontal: mx} : {},
        my ? {marginVertical: my} : {},
        p ? {padding: p} : {},
        pt ? {paddingTop: pt} : {},
        pb ? {paddingBottom: pb} : {},
        pl ? {paddingLeft: pl} : {},
        pr ? {paddingRight: pr} : {},
        px ? {paddingHorizontal: px} : {},
        py ? {paddingVertical: py} : {},
        style,
      ]}
      {...rest}
    />
  );
};

export default Image;
