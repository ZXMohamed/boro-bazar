// example rules for all forms schema
export const rules = {
  name: {
    minNameLength: 3,
    maxNameLength: 50,
  },

  email: {
    emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },

  phone: {
    phonePattern: /^[0-9]{10,15}$/,
  },

  password: {
    minPasswordLength: 8,
    maxPasswordLength: 100,
    passwordPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, // at least 1 lowercase, uppercase, number
  },

  otp: {
    otpLength: 6,
    otpPattern: /^[0-9]{6}$/,
  },

  search: {
    minSearchLength: 2,
    maxSearchLength: 100,
  },

  review: {
    minReviewLength: 10,
    maxReviewLength: 1000,
  },
};

// example messages for all forms schema
export const messages = {
  required: "This field is required",
  invalidEmail: "Invalid email format",
  passwordWeak: "Password must include uppercase, lowercase and number",
};
