import React, {useState} from 'react';
import {View, TouchableOpacity, SafeAreaView} from 'react-native';
import colors from '../../constants/colors';
import GiveRecognition from '../Modals/GiveRecognition/GiveRecognition';
import Text from '../Text';
import Icon from '../Icon';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import RecognitionActions from 'services/Recognition/actions';

const ICON_MAP = {
  Home: 'home',
  Rewards: 'gift',
  Recognition: 'clap',
  More: 'circle-more',
};

const TabBar = ({state, descriptors, navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const [openGiveRecognition, setOpenRecognition] = useState(false);

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }

          if (isFocused && route.name === 'Home') {
            dispatch(
              RecognitionActions.triggerHomeScrolling({
                value: new Date().getTime(),
              }),
            );
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        if (label === 'GivePoint') {
          return (
            <View key={index} style={styles.addPointButtonContainer}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.addPointButton}
                onPress={() => setOpenRecognition(true)}>
                <Icon name="plus" color="white" size={16} />
              </TouchableOpacity>
            </View>
          );
        }

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.5}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}>
            {isFocused && <View style={styles.activeIndicator} />}
            <Icon
              name={ICON_MAP[label]}
              color={isFocused ? colors.PRIMARY_TEXT : colors.SECONDARY_TEXT}
              size={19}
            />
            <Text
              mt={5}
              size={10}
              color={isFocused ? colors.PRIMARY_TEXT : colors.SECONDARY_TEXT}
              align="center">
              {t(label.toLowerCase())}
            </Text>
          </TouchableOpacity>
        );
      })}
      <GiveRecognition
        isVisible={openGiveRecognition}
        handleClose={() => setOpenRecognition(false)}
      />
    </SafeAreaView>
  );
};

export default TabBar;
