import Color from 'color';
import React from 'react';
import colors from '../../constants/colors';
import Box from '../Box';
import Text, {TextWeight} from '../Text';

const Tag = ({text, color, ...rest}) => {
  return (
    <Box
      py={3}
      px={16}
      borderRadius={12}
      backgroundColor={Color.rgb(color).alpha(0.15).toString()}
      {...rest}>
      <Text weight={TextWeight.BOLD} size={12} lineHeight={18} color={color}>
        {text}
      </Text>
    </Box>
  );
};

Tag.defaultProps = {
  color: colors.GREEN,
  text: 'This is the badge',
};

export default Tag;
