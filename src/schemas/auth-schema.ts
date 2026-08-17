import { object, ref, string } from 'yup';

export const usernameValidateSchema = string().required('Email hoặc số điện thoại là bắt buộc');

const passwordValidateSchema = string()
  .required('Mật khẩu là bắt buộc')
  .min(8, 'Mật khẩu bắt buộc có ít nhất 8 kí tự')
  .matches(/[a-zA-Z]/, 'Mật khẩu phải bao gồm ít nhất một chữ cái')
  .matches(/\d/, 'Mật khẩu phải bao gồm ít nhất một số');

const confirmPasswordValidateSchema = (label: string) =>
  string()
    .oneOf([ref(label)], "Mật khẩu và mật khẩu nhập lại không trùng nhau")
    .required('Mật khẩu nhập lại là bắt buộc');

// validate kiểm tra mật khẩu và mật khẩu nhập lại
const passwordSchema = <T extends string>(label: T) =>
  object().shape({
    password: passwordValidateSchema,
    confirmPassword: confirmPasswordValidateSchema(label),
  });

// validate đăng nhập
export const loginSchema = object().shape({
  username: usernameValidateSchema,
  password: string().required('Mật khẩu là bắt buộc'),
});

// validate đăng ký
export const registrationSchema = object()
  .shape({
    fullName: string().required('Họ và tên là bắt buộc'),
    phone: string().required('Số điện thoại là bắt buộc'),
    email: string().required('Email là bắt buộc'),
  })
  .concat(passwordSchema('password'));

// validate reset mật khẩu
export const resetPasswordValidationSchema = object()
  .shape({
    oldPassword: passwordValidateSchema,
  })
  .concat(passwordSchema('password'));

export const changePasswordSchema = passwordSchema('password');
