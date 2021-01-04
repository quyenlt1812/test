import Box from 'components/Box';
import React from 'react';
import {Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const RewardsSkeleton = () => {
  return (
    <Box p={15} flex={1}>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          width="100%"
          height={80}
          borderRadius={16}
          marginBottom={24}
        />
        <SkeletonPlaceholder.Item
          width="100%"
          height={184}
          borderRadius={16}
          marginBottom={10}
        />
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="center"
          marginBottom={18}>
          {[...new Array(3)].map((_, index) => (
            <SkeletonPlaceholder.Item
              key={index}
              width={8}
              height={8}
              borderRadius={4}
              marginHorizontal={6}
            />
          ))}
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          width={150}
          height={30}
          borderRadius={4}
          marginBottom={24}
        />
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          flexWrap="wrap"
          marginBottom={18}>
          {[...new Array(8)].map((_, index) => (
            <SkeletonPlaceholder.Item
              key={index}
              alignItems="center"
              marginBottom={24}>
              <SkeletonPlaceholder.Item
                width={50}
                height={50}
                borderRadius={8}
                marginBottom={10}
              />
              <SkeletonPlaceholder.Item
                width={80}
                height={25}
                borderRadius={4}
              />
            </SkeletonPlaceholder.Item>
          ))}
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          width={150}
          height={30}
          borderRadius={4}
          marginTop={12}
          marginBottom={24}
        />
        {[...new Array(8)].map((_, index) => (
          <SkeletonPlaceholder.Item
            key={index}
            alignItems="center"
            marginBottom={24}>
            <SkeletonPlaceholder.Item
              width={Dimensions.get('window').width - 45 / 2}
              height={50}
              borderRadius={8}
              marginBottom={10}
            />
            <SkeletonPlaceholder.Item width={80} height={25} borderRadius={4} />
          </SkeletonPlaceholder.Item>
        ))}
      </SkeletonPlaceholder>
    </Box>
  );
};

export default RewardsSkeleton;
