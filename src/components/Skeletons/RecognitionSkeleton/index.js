import React from 'react';
import Box from 'components/Box';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const RecognitionSkeleton = () => {
  return (
    <Box mx={15} mt={10}>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          width="100%"
          height={25}
          borderRadius={15}
          marginBottom={27}
        />
        <SkeletonPlaceholder.Item
          width="100%"
          height={180}
          borderRadius={4}
          marginBottom={40}
        />
        <SkeletonPlaceholder.Item
          width={152}
          height={30}
          borderRadius={4}
          marginBottom={40}
        />
        <SkeletonPlaceholder.Item>
          {[...new Array(10)].map((_, index) => (
            <SkeletonPlaceholder.Item
              key={index}
              flexDirection="row"
              marginBottom={30}>
              <SkeletonPlaceholder.Item
                width={50}
                height={50}
                borderRadius={25}
                marginRight={16}
              />
              <SkeletonPlaceholder.Item flex={1}>
                <SkeletonPlaceholder.Item
                  width={112}
                  height={24}
                  borderRadius={4}
                  marginBottom={8}
                />
                <SkeletonPlaceholder.Item
                  width="100%"
                  height={50}
                  borderRadius={4}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          ))}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </Box>
  );
};

export default RecognitionSkeleton;
