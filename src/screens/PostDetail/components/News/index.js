import {HtmlParseAndView} from '@react-native-html/renderer';
import Box from 'components/Box';
import Text, {TextWeight} from 'components/Text';
import colors from 'constants/colors';
import React from 'react';
import {useSelector} from 'react-redux';
import {getPost} from 'services/Recognition/selectors';

const htmlStyles = {
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.PRIMARY,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 30,
    color: colors.PRIMARY_TEXT,
    fontFamily: 'Nunito-Regular',
  },
};

const News = ({postId}) => {
  const post = useSelector((state) => getPost(state, postId));
  const {title, content} = post.news;
  return (
    <Box mt={15}>
      <Text size={20} mb={16} weight={TextWeight.BOLD}>
        {title}
      </Text>
      <HtmlParseAndView rawHtml={content} htmlStyles={htmlStyles} />
    </Box>
  );
};

export default News;
