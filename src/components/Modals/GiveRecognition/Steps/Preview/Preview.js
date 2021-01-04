import React from 'react';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native';
import {getCurrentUser} from 'services/Users/selectors';
import Box from 'components/Box';
import Text from 'components/Text';
import RecognitionPost from 'components/Post/RecognitionPost';

const Preview = ({
  selectedUser,
  selectedBadge,
  points,
  message,
  selectedImage,
}) => {
  const {t} = useTranslation();
  const currentUser = useSelector(getCurrentUser);
  return (
    <Box style={styles.fullSize} alignItems="center">
      <Box width="100%" mt={18} mb={24} px={15}>
        <Text size={18}>{t('preview-message')}</Text>
      </Box>
      <ScrollView style={{flex: 1, width: '100%'}}>
        <RecognitionPost
          data={{
            recognition: {
              receiver: selectedUser,
              sender: currentUser,
              badge: selectedBadge,
              image: selectedImage,
              message,
            },
          }}
          showActions={false}
        />
      </ScrollView>
    </Box>
  );
};

export default Preview;
