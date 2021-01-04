import Dino from 'assets/images/big-dino.svg';
import Box from 'components/Box';
import Header from 'components/Header';
import NotificationButton from 'components/NotificationButton';
import NewsPost from 'components/Post/NewsPost';
import RecognitionPost from 'components/Post/RecognitionPost';
import HomeFeedSkeleton from 'components/Skeletons/HomeFeedSkeleton';
import Text, {TextWeight} from 'components/Text';
import colors from 'constants/colors';
import Recognition from 'constants/recognition';
import LottieView from 'lottie-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {AppState, FlatList, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RecognitionActions from 'services/Recognition/actions';
import {
  getHomeScrolling,
  getRecognitions,
} from 'services/Recognition/selectors';
import Storage from 'services/Storage';
import UsersActions from 'services/Users/actions';
import {getCurrentUser} from 'services/Users/selectors';
import styles from './styles';

const Home = ({route}) => {
  const appState = useRef(AppState.currentState);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const recognitions = useSelector(getRecognitions);
  const homeScrolling = useSelector(getHomeScrolling);
  const [refreshing, setRefreshing] = useState(false);
  const _listRef = useRef();
  const data = route?.params;

  useEffect(() => {
    if (data?.fromNotification) {
      dispatch(
        RecognitionActions.triggerHomeScrolling({value: new Date().getTime()}),
      );
      dispatch(RecognitionActions.getRecognitions(0));
    }
  }, [data, dispatch]);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      dispatch(
        RecognitionActions.triggerHomeScrolling({value: new Date().getTime()}),
      );
      dispatch(RecognitionActions.getRecognitions(0));
    }

    appState.current = nextAppState;
  };

  // useEffect(() => {
  //   // Handle to navigate to Recognition Detail when opening notification from quit state
  //   messaging()
  //     .getInitialNotification()
  //     .then((remoteMessage) => {
  //       if (remoteMessage) {
  //         const post = JSON.parse(remoteMessage.data.post);
  //         NavigationService.navigate(
  //           NavigationService.Screens.RECOGNITION_DETAIL,
  //           {
  //             post,
  //           },
  //         );
  //       }
  //     });
  // }, []);

  useEffect(() => {
    const getUser = async () => {
      const userId = await Storage.getUserId();
      dispatch(UsersActions.getUserProfile(userId));
    };

    if (!currentUser) {
      getUser();
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (!recognitions.list) {
      dispatch(RecognitionActions.getRecognitions(0));
    }
  }, [recognitions, dispatch]);

  useEffect(() => {
    _listRef?.current?.scrollToOffset({animated: true, offset: 0});
  }, [homeScrolling]);

  useEffect(() => {
    setRefreshing(false);
  }, [recognitions]);

  const handleLoadMore = () => {
    if (recognitions.hasNext) {
      dispatch(RecognitionActions.getRecognitions(recognitions.offset + 1));
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(RecognitionActions.getRecognitions(0));
  };

  const renderItem = ({item}) => {
    switch (item.type) {
      case Recognition.PostType.RECOGNITION:
        return <RecognitionPost postId={item?.id} showActions={true} />;
      case Recognition.PostType.NEWS:
        return <NewsPost postId={item?.id} showActions={true} />;
      case Recognition.PostType.EVENT:
        return;
    }
  };

  const renderContent = () => {
    if (!recognitions.list) {
      return <HomeFeedSkeleton />;
    }
    if (!recognitions?.list?.length) {
      return (
        <Box alignItems="center" justifyContent="center" style={{flex: 1}}>
          <Text weight={TextWeight.SEMIBOLD} size={18} mt={20} mb={30}>
            {t('no-recognition')}
          </Text>
          <Dino width={300} />
          <Text
            mt={24}
            mx={30}
            mb={20}
            align="center"
            color={colors.SECONDARY_TEXT}>
            {t('no-recognition-message')}
          </Text>
          <Box width={50} height={50} mb={15} style={styles.arrowIcon}>
            <LottieView source={require('./arrow.json')} autoPlay loop />
          </Box>
        </Box>
      );
    }
    return (
      <FlatList
        removeClippedSubviews
        windowSize={21}
        maxToRenderPerBatch={60}
        ref={_listRef}
        style={styles.list}
        data={recognitions.list}
        keyExtractor={({id}) => `post-${id}`}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        onEndReached={handleLoadMore}
        ItemSeparatorComponent={() => (
          <Box height={8} backgroundColor={colors.WHITESMOKE} />
        )}
        contentContainerStyle={styles.listContentContainer}
        showsVerticalScrollIndicator={false}
        // ListFooterComponent={() => (showFooter ? renderPlaceholder(1) : null)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header rightComponent={<NotificationButton />} />
      {renderContent()}
    </SafeAreaView>
  );
};

export default Home;
