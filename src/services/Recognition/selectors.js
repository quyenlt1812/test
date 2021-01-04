export const getRecognitions = (state) => state?.recognition?.recognitions;

export const getSentRecognitions = (state) =>
  state?.recognition?.sentRecognitions ?? [];

export const getReceivedRecognition = (state) =>
  state?.recognition?.receivedRecognitions ?? [];

export const getTopValues = (state) => state?.recognition?.topValues;

export const getHomeScrolling = (state) =>
  state.recognition.triggerHomeScrollToTop;

export const getPost = (state, postId) => {
  return state?.recognition?.recognitions?.list?.find(
    (post) => post.id === postId,
  );
};
