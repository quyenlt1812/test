import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Box from 'components/Box';

const HomeFeedSkeleton = ({items}) => {
  return (
    <Box mx={15}>
      <SkeletonPlaceholder>
        {[...new Array(items)].map((_, index) => (
          <SkeletonPlaceholder.Item key={index} marginTop={19} marginBottom={8}>
            <SkeletonPlaceholder.Item flexDirection="row" marginBottom={12}>
              <SkeletonPlaceholder.Item
                width={40}
                height={40}
                borderRadius={20}
                marginRight={8}
              />
              <SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                  width={98}
                  height={20}
                  borderRadius={4}
                  marginBottom={4}
                />
                <SkeletonPlaceholder.Item
                  width={187}
                  height={18}
                  borderRadius={4}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width="100%"
              height={20}
              borderRadius={4}
              marginBottom={4}
            />
            <SkeletonPlaceholder.Item
              width="60%"
              height={20}
              borderRadius={4}
              marginBottom={8}
            />
            <SkeletonPlaceholder.Item
              width={124}
              height={24}
              borderRadius={12}
              marginBottom={13}
            />
            <SkeletonPlaceholder.Item
              width="100%"
              height={130}
              borderRadius={16}
            />
          </SkeletonPlaceholder.Item>
        ))}
      </SkeletonPlaceholder>
    </Box>
  );
};

HomeFeedSkeleton.defaultProps = {
  items: 10,
};

export default HomeFeedSkeleton;
