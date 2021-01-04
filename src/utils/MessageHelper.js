export const handleServerMessage = (error) => {
  if (error) {
    if (error?.response?.data?.errorCode) {
      return error?.response?.data?.errorCode;
    }
    if (error?.response?.data?.message) {
      const message = error?.response?.data?.message;
      if (typeof message === 'string') return message;
      if (Array.isArray(message) && message?.length) return message[0];
    }
    if (error.message) return error.message;
    return 'Something went wrong. Please try again later!';
  }
};
