import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import Box from '../../components/Box';
import Text, {TextWeight} from '../../components/Text';
import Header from '../../components/Header';
import colors from '../../constants/colors';
import Image from '../../components/Image';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentUser} from '../../services/Users/selectors';
import Storage from '../../services/Storage';
import UsersRepo from '../../services/Users/repo';
import UsersActions from '../../services/Users/actions';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  languageItem: {
    paddingHorizontal: 15,
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const Language = ({}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const [selectedLanguage, setSelectedLanguage] = useState(
    currentUser.language,
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setSaving(false);
    i18n.changeLanguage(currentUser.language);
  }, [i18n, currentUser.language]);

  const selectLanguage = (language) => setSelectedLanguage(language);

  const handleSaveLanguage = async () => {
    setSaving(true);
    const result = await UsersRepo.updateUserRepo({
      userId: currentUser.id,
      user: {language: selectedLanguage},
    });
    if (result?.data?.user) {
      setSaving(false);
      dispatch(UsersActions.setCurrentUser(result?.data?.user));
      Storage.setLanguage(result?.data?.user?.language);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        backable
        title={t('language')}
        rightComponent={
          <TouchableOpacity
            disabled={currentUser.language === selectedLanguage || saving}
            activeOpacity={0.5}
            onPress={handleSaveLanguage}
            style={{
              opacity: currentUser.language !== selectedLanguage ? 1 : 0.5,
            }}>
            {saving ? (
              <ActivityIndicator />
            ) : (
              <Text size={18} weight={TextWeight.BOLD} color={colors.PRIMARY}>
                {t('save')}
              </Text>
            )}
          </TouchableOpacity>
        }
      />
      <Box>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.languageItem}
          onPress={() => selectLanguage('en')}>
          <Box flexDirection="row" alignItems="center">
            <Box
              width={36}
              height={36}
              borderRadius={18}
              mr={15}
              style={{overflow: 'hidden'}}>
              <Image
                src={require('../../assets/images/en.png')}
                width={36}
                height={36}
                borderRadius={18}
              />
            </Box>
            <Text>{t('en')}</Text>
          </Box>
          <Box
            width={24}
            height={24}
            alignItems="center"
            justifyContent="center"
            borderRadius={12}
            backgroundColor={colors.PRIMARY}>
            <Box
              width={20}
              height={20}
              borderRadius={10}
              backgroundColor={
                selectedLanguage === 'en' ? colors.PRIMARY : colors.WHITE
              }
              style={{
                borderColor: colors.WHITE,
                borderWidth: 2,
              }}
            />
          </Box>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.languageItem}
          onPress={() => selectLanguage('vi')}>
          <Box flexDirection="row" alignItems="center">
            <Box
              width={36}
              height={36}
              borderRadius={18}
              mr={15}
              style={{overflow: 'hidden'}}>
              <Image
                src={require('../../assets/images/vi.png')}
                width={36}
                height={36}
                borderRadius={18}
              />
            </Box>
            <Text>{t('vi')}</Text>
          </Box>
          <Box
            width={24}
            height={24}
            alignItems="center"
            justifyContent="center"
            borderRadius={12}
            backgroundColor={colors.PRIMARY}>
            <Box
              width={20}
              height={20}
              borderRadius={10}
              backgroundColor={
                selectedLanguage === 'vi' ? colors.PRIMARY : colors.WHITE
              }
              style={{
                borderColor: colors.WHITE,
                borderWidth: 2,
              }}
            />
          </Box>
        </TouchableOpacity>
      </Box>
    </SafeAreaView>
  );
};

export default Language;
