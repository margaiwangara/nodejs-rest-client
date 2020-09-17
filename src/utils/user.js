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
    strategy,
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
    strategy,
  };
};
