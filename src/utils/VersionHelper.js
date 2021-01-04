export const detachVersion = (version) => {
  const versionArr = version.split('.');
  if (versionArr.length === 3) {
    return {
      major: Number.parseInt(versionArr[0], 10),
      minor: Number.parseInt(versionArr[1], 10),
      patch: Number.parseInt(versionArr[2], 10),
    };
  }
};
