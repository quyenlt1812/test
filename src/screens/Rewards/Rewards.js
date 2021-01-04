import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RewardActions from 'services/Reward/actions';
import RewardsSkeleton from 'components/Skeletons/RewardsSkeleton';
import {getRewards, isRewardsLoading} from 'services/Reward/selectors';
import Box from 'components/Box';
import TotalPoints from 'components/TotalPoints';
import PictureSlider from 'components/PictureSlider';
import Categories from 'components/Categories';
import RewardItem from 'components/RewardItem';
import Header from 'components/Header';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  list: {flex: 1},
  listContentContainer: {
    paddingTop: 8,
    paddingBottom: 30,
  },
});

const Rewards = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const rewards = useSelector(getRewards);
  const isLoading = useSelector(isRewardsLoading);

  useEffect(() => {
    if (!rewards) {
      dispatch(RewardActions.refreshRewards());
    }
  }, [rewards, dispatch]);

  const handleRefresh = () => {
    dispatch(RewardActions.refreshRewards());
  };

  const renderListHeader = () => {
    return (
      <Box mb={24}>
        <Box mb={24} mx={15}>
          <TotalPoints />
        </Box>
        <Box mb={18}>
          <PictureSlider />
        </Box>
        <Box mx={15}>
          <Categories />
        </Box>
        {/* <Text
          weight={TextWeight.SEMIBOLD}
          size={20}
          lineHeight={30}
          mt={35}
          mx={15}>
          {t('all-rewards')}
        </Text> */}
      </Box>
    );
  };

  const renderItem = ({item}) => <RewardItem {...item} />;

  return (
    <SafeAreaView style={styles.container}>
      <Header title={t('rewards')} />
      {!rewards ? (
        <RewardsSkeleton />
      ) : (
        <FlatList
          refreshing={isLoading}
          onRefresh={handleRefresh}
          data={[]}
          initialNumToRender={10}
          style={styles.list}
          contentContainerStyle={styles.listContentContainer}
          ListHeaderComponent={renderListHeader}
          numColumns={2}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <Box height={24} />}
          // ListEmptyComponent={() => (
          //   <Text align="center" color={colors.SECONDARY_TEXT}>
          //     There's no reward at the moment
          //   </Text>
          // )}
        />
      )}
    </SafeAreaView>
  );
};

export default Rewards;
