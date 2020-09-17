export const userData = (data) => {
  const {
    email,
    name,
    surname,
    createdAt,
    profileImage,
    twoFactorCode,
    twoFactorCodeExpire,
    recoveryEmail,
    twoFactorEnable,
  } = data;

  return {
    email,
    name,
    surname,
    createdAt,
    profileImage,
    twoFactorCode,
    twoFactorCodeExpire,
    recoveryEmail,
    twoFactorEnable,
  };
};
