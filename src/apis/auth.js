// import { post_api, get_api, put_api } from "./index"
// import { 
//   loginEmailSchema, 
//   loginPhoneSchema, 
//   otpVerificationSchema, 
//   emailOtpVerificationSchema,
//   forgotPasswordSchema, 
//   resetPasswordSchema,
//   validate 
// } from "./validators"
// import { toast } from "react-hot-toast"

// // Login with email
// const loginByEmail = async (data) => {
//   // Validate data before making API call
//   const validation = await validate(loginEmailSchema, data)
//   if (!validation.isValid) {
//     // Show first error message
//     const firstError = Object.values(validation.errors)[0]
//     toast.error(firstError)
//     return Promise.reject({ validation: validation.errors })
//   }

//   return await post_api("/user/login_by_email", data)
// }

// // Login with phone - send OTP
// const loginByPhone = async (data) => {
//   // Validate data before making API call
//   const validation = await validate(loginPhoneSchema, data)
//   if (!validation.isValid) {
//     // Show first error message
//     const firstError = Object.values(validation.errors)[0]
//     toast.error(firstError)
//     return Promise.reject({ validation: validation.errors })
//   }

//   return await post_api("/user/login_by_phone", {
//     country_code: data.country_code,
//     mobile: data.mobile,
//   })
// }

// // Verify OTP for phone login
// const verifyOtp = async (data, token) => {
//   // Validate data before making API call
//   const validation = await validate(otpVerificationSchema, data)
//   if (!validation.isValid) {
//     // Show first error message
//     const firstError = Object.values(validation.errors)[0]
//     toast.error(firstError)
//     return Promise.reject({ validation: validation.errors })
//   }

//   return await post_api("/user/verify_otp", data, {
//     headers: {
//       token: token,
//       key: "token",
//       type: "text",
//     },
//   })
// }

// // Forgot password - send OTP
// const forgotPassword = async (data) => {
//   // Validate data before making API call
//   const validation = await validate(forgotPasswordSchema, data)
//   if (!validation.isValid) {
//     // Show first error message
//     const firstError = Object.values(validation.errors)[0]
//     toast.error(firstError)
//     return Promise.reject({ validation: validation.errors })
//   }

//   return await post_api("/user/forgot_password", {
//     email: data.email,
//   })
// }

// // Verify OTP for forgot password
// const verifyForgotPasswordOtp = async (data, token) => {
//   // Validate data before making API call
//   const validation = await validate(emailOtpVerificationSchema, data)
//   if (!validation.isValid) {
//     // Show first error message
//     const firstError = Object.values(validation.errors)[0]
//     toast.error(firstError)
//     return Promise.reject({ validation: validation.errors })
//   }

//   return await post_api(
//     "/user/verify_otp",
//     {
//       email: data.email,
//       otp: data.otp,
//     },
//     {
//       headers: {
//         token: token,
//       },
//     },
//   )
// }

// // Reset password
// const resetPassword = async (data, token) => {
//   // Create a new object with confirmPassword if it exists in data
//   const validationData = {
//     password: data.password,
//     confirmPassword: data.confirmPassword || data.password, // Use password as confirmPassword if not provided
//   }

//   // Validate data before making API call
//   const validation = await validate(resetPasswordSchema, validationData)
//   if (!validation.isValid) {
//     // Show first error message
//     const firstError = Object.values(validation.errors)[0]
//     toast.error(firstError)
//     return Promise.reject({ validation: validation.errors })
//   }

//   return await put_api(
//     "/user/reset_password",
//     {
//       password: data.password,
//     },
//     {
//       headers: {
//         token: token,
//       },
//     },
//   )
// }

// // Get user profile
// const getUserProfile = async () => {
//   return await get_api("/user/profile")
// }

// // Logout
// const logout = async () => {
//   return await get_api("/user/logout")
// }

// export {
//   loginByEmail,
//   loginByPhone,
//   verifyOtp,
//   forgotPassword,
//   verifyForgotPasswordOtp,
//   resetPassword,
//   getUserProfile,
//   logout,
// }


import { post_api, get_api, put_api } from "./index"
import {
  loginEmailSchema,
  loginPhoneSchema,
  otpVerificationSchema,
  emailOtpVerificationSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  validate,
} from "./validators"
import { toast } from "react-hot-toast"

// Login with email
const loginByEmail = async (data) => {
  // Validate data before making API call
  const validation = await validate(loginEmailSchema, data)
  if (!validation.isValid) {
    // Show first error message
    const firstError = Object.values(validation.errors)[0]
    toast.error(firstError)
    return Promise.reject({ validation: validation.errors })
  }

  return await post_api("/user/login_by_email", data)
}

// Login with phone - send OTP
const loginByPhone = async (data) => {
  // Validate data before making API call
  const validation = await validate(loginPhoneSchema, data)
  if (!validation.isValid) {
    // Show first error message
    const firstError = Object.values(validation.errors)[0]
    toast.error(firstError)
    return Promise.reject({ validation: validation.errors })
  }

  return await post_api("/user/login_by_phone", {
    country_code: data.country_code,
    mobile: data.mobile,
  })
}

// Verify OTP for phone login
const verifyOtp = async (data, token) => {
  // Validate data before making API call
  const validation = await validate(otpVerificationSchema, data)
  if (!validation.isValid) {
    // Show first error message
    const firstError = Object.values(validation.errors)[0]
    toast.error(firstError)
    return Promise.reject({ validation: validation.errors })
  }

  return await post_api("/user/verify_otp", data, {
    headers: {
      token: token,
      key: "token",
      type: "text",
    },
  })
}

// Forgot password - send OTP
const forgotPassword = async (data) => {
  // Validate data before making API call
  const validation = await validate(forgotPasswordSchema, data)
  if (!validation.isValid) {
    // Show first error message
    const firstError = Object.values(validation.errors)[0]
    toast.error(firstError)
    return Promise.reject({ validation: validation.errors })
  }

  return await post_api("/user/forgot_password", {
    email: data.email,
  })
}

// Verify OTP for forgot password
const verifyForgotPasswordOtp = async (data, token) => {
  // Validate data before making API call
  const validation = await validate(emailOtpVerificationSchema, data)
  if (!validation.isValid) {
    // Show first error message
    const firstError = Object.values(validation.errors)[0]
    toast.error(firstError)
    return Promise.reject({ validation: validation.errors })
  }

  return await post_api(
    "/user/verify_otp",
    {
      email: data.email,
      otp: data.otp,
    },
    {
      headers: {
        token: token,
      },
    },
  )
}

// Reset password
const resetPassword = async (data, token) => {
  // Create a new object with confirmPassword if it exists in data
  const validationData = {
    password: data.password,
    confirmPassword: data.confirmPassword || data.password, // Use password as confirmPassword if not provided
  }

  // Validate data before making API call
  const validation = await validate(resetPasswordSchema, validationData)
  if (!validation.isValid) {
    // Show first error message
    const firstError = Object.values(validation.errors)[0]
    toast.error(firstError)
    return Promise.reject({ validation: validation.errors })
  }

  return await put_api(
    "/user/reset_password",
    {
      password: data.password,
    },
    {
      headers: {
        token: token,
      },
    },
  )
}

// Get user profile
const getUserProfile = async () => {
  return await get_api("/user/profile")
}

// Logout
const logoutUser = async () => {
  const email = localStorage.getItem("email")
  const password = localStorage.getItem("password")
  const token = localStorage.getItem("token")

  try {
    const response = await post_api(
      "/user/logout",
      { email, password },
      {
        headers: {
          token: token,
        },
      },
    )

    if (response.data && response.data.status_code === 1) {
      toast.success(response.data.message)
      localStorage.clear()
    }

    return response
  } catch (error) {
    console.error("Logout error:", error)
    throw error
  }
}

export {
  loginByEmail,
  loginByPhone,
  verifyOtp,
  forgotPassword,
  verifyForgotPasswordOtp,
  resetPassword,
  getUserProfile,
  logoutUser,
}
