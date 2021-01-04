import React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import Box from '../../../../Box';
import Image from '../../../../Image';
import styles from './styles';
import Icon from '../../../../Icon';
import {useSelector} from 'react-redux';
import {getRecognitionImages} from '../../../../../services/App/selectors';

const AddImage = ({selectedImage, setSelectedImage}) => {
  const images = useSelector(getRecognitionImages);

  const onSelectImage = (image) => {
    if (image === selectedImage) {
      setSelectedImage('');
    } else {
      setSelectedImage(image);
    }
  };

  return (
    <Box style={styles.fullSize} alignItems="center">
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}>
        {images.map((image) => (
          <TouchableOpacity
            key={image.id}
            activeOpacity={0.5}
            onPress={() => onSelectImage(image)}>
            <Box key={image?.id} width="100%" height={130} mb={8}>
              {image?.url === selectedImage?.url && (
                <Box
                  width="100%"
                  height="100%"
                  style={styles.imageSelectedContainer}>
                  <Icon name="circle-check" size={20} />
                </Box>
              )}
              <Image src={image?.url} width="100%" height={130} />
            </Box>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Box>
  );
};

export default AddImage;
