import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, SafeAreaView} from 'react-native';
import {useTranslation} from 'react-i18next';
import Box from '../../components/Box';
import Header from '../../components/Header';
import styles from './styles';
import RewardItem from '../../components/RewardItem';
import Api from '../../services/Api';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const RewardsByCategory = ({route}) => {
  const {t} = useTranslation();
  const {collection} = route?.params;
  const [rewards, setRewards] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const renderSkeleton = () => {
    return (
      <Box m={15}>
        <SkeletonPlaceholder>
          {[...new Array(5)].map((_, index) => (
            <SkeletonPlaceholder.Item
              key={index}
              flexDirection="row"
              marginBottom={24}>
              {[...new Array(2)].map((_, index) => (
                <SkeletonPlaceholder.Item key={index} marginRight={15}>
                  <SkeletonPlaceholder.Item
                    width={(Dimensions.get('window').width - 45) / 2}
                    height={
                      ((Dimensions.get('window').width - 30 - 16) / 2 / 75) *
                      100
                    }
                    borderRadius={12}
                    marginBottom={8}
                  />
                  <SkeletonPlaceholder.Item
                    width={100}
                    height={16}
                    borderRadius={4}
                    marginBottom={4}
                  />
                  <SkeletonPlaceholder.Item
                    width={(Dimensions.get('window').width - 45) / 2}
                    height={18}
                    borderRadius={4}
                    marginBottom={4}
                  />
                  <SkeletonPlaceholder.Item
                    width={(Dimensions.get('window').width - 150) / 2}
                    height={18}
                    borderRadius={4}
                    marginBottom={8}
                  />
                  <SkeletonPlaceholder.Item
                    width={60}
                    height={22}
                    borderRadius={4}
                  />
                </SkeletonPlaceholder.Item>
              ))}
            </SkeletonPlaceholder.Item>
          ))}
        </SkeletonPlaceholder>
      </Box>
    );
  };

  const getRewards = async () => {
    Api({
      url: `/rewards/collections/${collection.id}/rewards`,
    })
      .then((resp) => {
        if (resp.data.data.rewards) {
          setRefreshing(false);
          setRewards(resp.data.data.rewards);
        }
      })
      .catch((error) => {
        console.error('getRewards -> error', error);
      });
  };

  useEffect(() => {
    getRewards();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    getRewards();
  };

  const renderItem = ({item}) => <RewardItem {...item} />;

  return (
    <SafeAreaView style={styles.container}>
      <Header backable title={collection.title} />
      {!rewards ? (
        renderSkeleton()
      ) : (
        <FlatList
          onRefresh={handleRefresh}
          refreshing={refreshing}
          initialNumToRender={10}
          style={styles.list}
          contentContainerStyle={styles.listContentContainer}
          numColumns={2}
          data={rewards}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <Box height={24} />}
        />
      )}
    </SafeAreaView>
  );
};

export default RewardsByCategory;
