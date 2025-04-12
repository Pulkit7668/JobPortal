import * as yup from "yup"

// Email login validation schema
export const loginEmailSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
})

// Phone login validation schema
export const loginPhoneSchema = yup.object().shape({
  country_code: yup.string().required("Country code is required"),
  mobile: yup.string().required("Mobile number is required").min(8, "Mobile number must be at least 8 digits"),
})

// OTP verification schema
export const otpVerificationSchema = yup.object().shape({
  country_code: yup.string().required("Country code is required"),
  mobile: yup.string().required("Mobile number is required"),
  otp: yup
    .string()
    .required("OTP is required")
    .matches(/^\d{6}$/, "OTP must be 6 digits"),
})

// Email OTP verification schema
export const emailOtpVerificationSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  otp: yup
    .string()
    .required("OTP is required")
    .matches(/^\d{6}$/, "OTP must be 6 digits"),
})

// Forgot password schema
export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Email is required"),
})

// Reset password schema
export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
})

// Validate function to validate data against a schema
export const validate = async (schema, data) => {
  try {
    await schema.validate(data, { abortEarly: false })
    return { isValid: true, errors: null }
  } catch (error) {
    if (error.inner) {
      const errors = {}
      error.inner.forEach((err) => {
        errors[err.path] = err.message
      })
      return { isValid: false, errors }
    }
    return { isValid: false, errors: { general: error.message } }
  }
}