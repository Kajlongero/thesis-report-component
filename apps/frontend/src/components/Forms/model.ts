import * as Yup from "yup";

const email = Yup.string()
  .email()
  .min(3)
  .max(255)
  .required("Email is required");

const password = Yup.string().min(8).max(64).required("Password is required");

const bool = Yup.boolean().default(false);

export const validateSignupSchema = Yup.object({
  email,
  password,
  lastName: Yup.string().min(1).max(64).required(),
  firstName: Yup.string().min(1).max(64).required(),
});

export const validateLoginSchema = Yup.object({
  email,
  password,
});

export const changePasswordSchema = Yup.object({
  oldPassword: password,
  newPassword: password,
  confirmPassword: password,
  closeOtherSessions: bool,
});
