import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import Modal from 'react-native-modal';
import GiveRecognitionFooter from './GiveRecognitionFooter';
import GiveRecognitionHeader from './GiveRecognitionHeader';
import AddPoints from './Steps/AddPoints/AddPoints';
import BadgeSelection from './Steps/BadgeSelection';
import FindUsers from './Steps/FindUsers';
import LeaveAMessage from './Steps/LeaveAMessage';
import AddImage from './Steps/AddImage';
import Preview from './Steps/Preview';
import styles from './styles';
import Recognition from '../../../constants/recognition';
import {KeyboardAvoidingView} from 'react-native';
import {Platform} from 'react-native';

const GiveRecognition = ({isVisible, handleClose}) => {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedUser, setSelectedUser] = useState();
  const [selectedBadge, setSelectedBadge] = useState();
  const [message, setMessage] = useState('');
  const [points, setPoints] = useState(0);
  const [selectedImage, setSelectedImage] = useState();

  const closeModal = () => {
    setActiveStep(1);
    setSelectedUser(null);
    setSelectedBadge(null);
    setMessage(null);
    setPoints(0);
    setSelectedImage(null);
    handleClose();
  };

  const goToNextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const goToPreviousStep = () => {
    setActiveStep(activeStep - 1);
  };

  const selectUser = (user) => {
    if (selectedUser?.id === user.id) {
      setSelectedUser();
      return;
    }
    setSelectedUser(user);
  };

  const removeSelectedUser = () => {
    setSelectedUser({});
    setActiveStep(1);
  };

  const selectBadge = (badge) => setSelectedBadge(badge);

  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return (
          <FindUsers selectedUser={selectedUser} selectUser={selectUser} />
        );
      case 2:
        return (
          <BadgeSelection
            selectedUser={selectedUser}
            selectedBadge={selectedBadge}
            selectBadge={selectBadge}
            removeSelectedUser={removeSelectedUser}
          />
        );
      case 3:
        return (
          <LeaveAMessage
            selectedUser={selectedUser}
            selectedBadge={selectedBadge}
            removeSelectedUser={removeSelectedUser}
            message={message}
            setMessage={setMessage}
          />
        );
      case 4:
        return <AddPoints points={points} setPoints={setPoints} />;
      case 5:
        return (
          <AddImage
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        );
      case 6:
        return (
          <Preview
            selectedUser={selectedUser}
            selectedBadge={selectedBadge}
            points={points}
            selectedImage={selectedImage}
            message={message}
          />
        );
    }
  };

  const onSkipPress = () => {
    setSelectedImage('');
    goToNextStep();
  };

  return (
    <Modal
      useNativeDriver
      hideModalContentWhileAnimating
      isVisible={isVisible}
      onBackButtonPress={closeModal}
      backdropColor="transparent"
      style={styles.modalContainer}>
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: 'white'}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <SafeAreaView>
          <GiveRecognitionHeader
            title={Recognition.Steps[activeStep].title}
            handleClose={closeModal}
            skipable={activeStep === 5}
            goToNexStep={goToNextStep}
            onSkipPress={onSkipPress}
          />
        </SafeAreaView>
        <View style={styles.stepContainer}>{renderStep()}</View>
        <GiveRecognitionFooter
          nextStep={
            activeStep === 6 ? '' : Recognition.Steps[activeStep + 1].title
          }
          goToNextStep={goToNextStep}
          goToPreviousStep={goToPreviousStep}
          activeStep={activeStep}
          selectedBadge={selectedBadge}
          message={message}
          points={points}
          selectedImage={selectedImage}
          handleClose={closeModal}
          selectedUser={selectedUser}
        />
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default GiveRecognition;
