export const normalizeUser = (user: any) => ({
  ...user,
  phone_number: user?.phone_number ?? user?.phoneNumber ?? user?.phone ?? '',
});
