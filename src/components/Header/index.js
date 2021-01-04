import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Text, {TextWeight} from 'components/Text';
import Logo from 'assets/images/logo-small.svg';
import styles from './styles';
import Icon from 'components/Icon';
import Box from 'components/Box';

const Header = ({title, titleStyle, rightComponent, backable}) => {
  const navigation = useNavigation();

  const renderTitle = () => {
    if (typeof title === 'string') {
      return (
        <Text
          size={18}
          weight={TextWeight.EXTRABOLD}
          style={styles.title}
          numberOfLines={1}
          mx={60}
          align="center"
          {...titleStyle}>
          {title}
        </Text>
      );
    } else {
      return title;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {backable && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={18} />
          </TouchableOpacity>
        )}
        {title ? renderTitle() : <Logo />}
        {rightComponent && (
          <Box style={styles.rightComponentContainer}>{rightComponent}</Box>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Header;
