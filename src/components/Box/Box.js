import React from 'react';
import {View} from 'react-native';

const Box = ({
  children,
  backgroundColor,
  width,
  height,
  borderRadius,
  boxShadow,
  style,
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
  flexDirection,
  alignItems,
  justifyContent,
  flex,
  ...rest
}) => {
  return (
    <View
      style={[
        {backgroundColor, borderRadius},
        width ? {width} : {},
        height ? {height} : {},
        flex ? {flex} : {},
        flexDirection ? {flexDirection} : {},
        alignItems ? {alignItems} : {},
        justifyContent ? {justifyContent} : {},
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
      {...rest}>
      {children}
    </View>
  );
};

Box.defaultProps = {
  backgroundColor: 'transparent',
  borderRadius: 0,
};

export default Box;
