const BASE_URL = (name: string) => `${process.env.BASE_URL}${name}`;

export const API_URL = {
  LOGIN: BASE_URL("login"),
  REGISTER: BASE_URL("register"),
  RECOVERY: BASE_URL("recovery"),
  CONFIRM_CODE: BASE_URL("confirm-code"),
  CHANGE_PASSWORD: BASE_URL("change-password"),
};
