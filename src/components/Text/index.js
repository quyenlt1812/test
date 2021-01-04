import React from 'react';
import PropTypes from 'prop-types';
import {Text as NativeText} from 'react-native';
import colors from '../../constants/colors';

export const TextWeight = {
  LIGHT: 'light', // 300
  REGULAR: 'regular', // 400
  SEMIBOLD: 'semibold', // 600
  BOLD: 'bold', // 700
  EXTRABOLD: 'extrabold', // 800
  BLACK: 'black', // 900
};

const weightMapping = {
  light: 'Nunito-Light', // 300
  regular: 'Nunito-Regular', // 400
  semibold: 'Nunito-SemiBold', // 600
  bold: 'Nunito-Bold', // 700
  extrabold: 'Nunito-ExtraBold', // 800
  black: 'Nunito-Black', // 900
};

const Text = ({
  children,
  size,
  color,
  weight,
  align,
  lineHeight,
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
  ...rest
}) => {
  return (
    <NativeText
      maxFontSizeMultiplier={1}
      style={[
        {
          fontSize: size,
          textAlign: align,
          color: color,
          fontFamily: weightMapping[weight],
        },
        lineHeight ? {lineHeight} : {},
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
      {children === undefined ? '' : children}
    </NativeText>
  );
};

Text.propTypes = {
  children: PropTypes.any.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  weight: PropTypes.string,
  align: PropTypes.string,
  lineHeight: PropTypes.number,
  style: PropTypes.object,
  m: PropTypes.number,
  mt: PropTypes.number,
  mb: PropTypes.number,
  ml: PropTypes.number,
  mr: PropTypes.number,
  mx: PropTypes.number,
  my: PropTypes.number,
  p: PropTypes.number,
  pt: PropTypes.number,
  pb: PropTypes.number,
  pl: PropTypes.number,
  pr: PropTypes.number,
  px: PropTypes.number,
  py: PropTypes.number,
};

Text.defaultProps = {
  size: 16,
  color: colors.PRIMARY_TEXT,
  weight: 'regular',
  align: 'left',
};

export default Text;
