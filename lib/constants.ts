export const PASSWORD_MIN_LENGTH = 4;

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/;

export const PASSWORD_REGEX_ERROR =
  "비밀번호는 영어 대소문자, 숫자, 특수문자가 조합되어야 해요";
