import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {format} from 'date-fns';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Box from '../../components/Box';
import Text, {TextWeight} from '../../components/Text';
import Header from '../../components/Header';
import colors from '../../constants/colors';
import Color from 'color';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentUser} from '../../services/Users/selectors';
import UsersActions from '../../services/Users/actions';
import DatePicker from '../../components/Modals/DatePicker';
import Avatar from '../../components/Avatar';
import {useTranslation} from 'react-i18next';
import AvatarPicker from '../../components/Modals/AvatarPicker';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  avatarContainer: {borderColor: colors.WHITESMOKE, borderBottomWidth: 1},
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    height: 54,
    paddingRight: 15,
    borderColor: colors.WHITESMOKE,
    borderBottomWidth: 1,
    color: colors.PRIMARY_TEXT,
  },
  inputGroup: {
    borderBottomWidth: 1,
    borderColor: colors.WHITESMOKE,
  },
});

const MyAccount = ({}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const [avatar, setAvatar] = useState(currentUser?.avatar);
  const [name, setName] = useState(currentUser?.name);
  const [dob, setDob] = useState(currentUser?.birthday || '');
  const [role, setRole] = useState(currentUser?.role?.title || '');
  const [department, setDepartment] = useState(currentUser?.department?.name);
  const [phone, setPhone] = useState(currentUser?.phone_number);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [openAvatarPicker, setOpenAvatarPicker] = useState(false);

  useEffect(() => {
    setUploadingAvatar(false);
    setAvatar(currentUser?.avatar);
  }, [currentUser.avatar]);

  useEffect(() => {
    if (phone !== currentUser.phone_number) {
      setIsDirty(true);
    } else {
      setIsDirty(false);
    }
  }, [name, dob, role, department, phone, currentUser]);

  const handleUpdateUser = () => {
    const data = {
      phone_number: phone,
    };
    if (dob.length) {
      data.birthday = new Date(dob).getTime;
    }
    Keyboard.dismiss();
    dispatch(UsersActions.updateUser(data));
  };

  const changeAvatar = (file) => {
    setUploadingAvatar(true);
    dispatch(UsersActions.uploadAvatar(file));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={t('my-account')}
        backable
        rightComponent={
          <TouchableOpacity
            disabled={!isDirty}
            activeOpacity={0.5}
            onPress={handleUpdateUser}
            style={{opacity: isDirty ? 1 : 0.5}}>
            <Text size={18} weight={TextWeight.BOLD} color={colors.PRIMARY}>
              {t('save')}
            </Text>
          </TouchableOpacity>
        }
      />
      <KeyboardAwareScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: 30}}>
        <Box pt={16} pb={32} alignItems="center" style={styles.avatarContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setOpenAvatarPicker(true)}>
            <Box
              width={80}
              height={80}
              borderRadius={40}
              style={{overflow: 'hidden'}}>
              <Avatar src={avatar} alt={name} size={80} />
              {uploadingAvatar ? (
                <Box
                  width={80}
                  height={80}
                  borderRadius={40}
                  alignItems="center"
                  justifyContent="center"
                  backgroundColor={Color.rgb(colors.WHITE)
                    .alpha(0.5)
                    .toString()}
                  style={{position: 'absolute', top: 0, left: 0}}>
                  <ActivityIndicator color={colors.BLACK} />
                </Box>
              ) : (
                <Box
                  height={24}
                  width={80}
                  alignItems="center"
                  justifyContent="center"
                  backgroundColor={Color.rgb(colors.PRIMARY_TEXT)
                    .alpha(0.5)
                    .toString()}
                  style={{position: 'absolute', bottom: 0}}>
                  <Text size={14} color={colors.WHITE}>
                    {t('edit')}
                  </Text>
                </Box>
              )}
            </Box>
          </TouchableOpacity>
        </Box>
        <Box style={styles.inputGroup}>
          <Box pl={15} height={54} flexDirection="row" alignItems="center">
            <Box width={125}>
              <Text>{t('name')}</Text>
            </Box>
            <TextInput
              editable={false}
              placeholder="Enter your name"
              selectionColor={colors.PRIMARY}
              style={styles.input}
              value={name}
              onChangeText={(value) => setName(value)}
              placeholderTextColor={colors.SECONDARY_TEXT}
              maxFontSizeMultiplier={1}
              maxLength={50}
            />
          </Box>
          <Box pl={15} height={54} flexDirection="row" alignItems="center">
            <Box width={125}>
              <Text>{t('birthday')}</Text>
            </Box>
            <TouchableOpacity
              disabled
              activeOpacity={0.5}
              style={[styles.input, {justifyContent: 'center'}]}
              onPress={() => setOpenDatePicker(true)}>
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between">
                <Text color={dob ? colors.PRIMARY_TEXT : colors.SECONDARY_TEXT}>
                  {dob ? format(new Date(dob), 'MM/dd') : 'N/A'}
                </Text>
                {/* <Icon name="calendar" size={22} color={colors.SECONDARY_TEXT} /> */}
              </Box>
            </TouchableOpacity>
          </Box>
          <Box pl={15} height={54} flexDirection="row" alignItems="center">
            <Box width={125}>
              <Text>{t('role')}</Text>
            </Box>
            <TextInput
              editable={false}
              placeholder="Enter your role"
              selectionColor={colors.PRIMARY}
              style={styles.input}
              value={role}
              onChangeText={(value) => setRole(value)}
              placeholderTextColor={colors.SECONDARY_TEXT}
              maxFontSizeMultiplier={1}
            />
          </Box>
          <Box pl={15} height={54} flexDirection="row" alignItems="center">
            <Box width={125}>
              <Text>{t('department')}</Text>
            </Box>
            <TextInput
              editable={false}
              placeholder="N/A"
              selectionColor={colors.PRIMARY}
              style={[styles.input, {borderColor: 'transparent'}]}
              value={department}
              onChangeText={(value) => setDepartment(value)}
              placeholderTextColor={colors.SECONDARY_TEXT}
              maxFontSizeMultiplier={1}
            />
          </Box>
        </Box>
        <Box style={styles.inputGroup}>
          <Text px={15} py={12} weight={TextWeight.EXTRABOLD}>
            {t('contact-info')}
          </Text>
          <Box pl={15} height={54} flexDirection="row" alignItems="center">
            <Box width={125}>
              <Text>{t('phone')}</Text>
            </Box>
            <TextInput
              keyboardType="phone-pad"
              placeholder="XXX XXX XXXX"
              selectionColor={colors.PRIMARY}
              style={styles.input}
              value={phone}
              onChangeText={(value) => setPhone(value)}
              placeholderTextColor={colors.SECONDARY_TEXT}
              maxFontSizeMultiplier={1}
            />
          </Box>
          <Box pl={15} height={54} flexDirection="row" alignItems="center">
            <Box width={125}>
              <Text>{t('work-email')}</Text>
            </Box>
            <Text>{currentUser?.email}</Text>
          </Box>
        </Box>
      </KeyboardAwareScrollView>
      <DatePicker
        initialDate={dob}
        isVisible={openDatePicker}
        handleClose={() => setOpenDatePicker(false)}
        confirmDate={(date) => setDob(date)}
      />
      <AvatarPicker
        open={openAvatarPicker}
        handleClose={() => setOpenAvatarPicker(false)}
        changeAvatar={changeAvatar}
      />
    </SafeAreaView>
  );
};

export default MyAccount;
