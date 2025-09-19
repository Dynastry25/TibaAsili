export const validatePatientForm = (data) => {
  const errors = {};

  if (!data.name?.trim()) {
    errors.name = 'Name is required';
  }

  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (!data.phone?.trim()) {
    errors.phone = 'Phone number is required';
  }

  if (!data.age) {
    errors.age = 'Age is required';
  } else if (data.age < 0 || data.age > 150) {
    errors.age = 'Age must be between 0 and 150';
  }

  if (!data.gender) {
    errors.gender = 'Gender is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateAppointmentForm = (data) => {
  const errors = {};

  if (!data.patientId) {
    errors.patientId = 'Patient selection is required';
  }

  if (!data.doctorId) {
    errors.doctorId = 'Doctor selection is required';
  }

  if (!data.date) {
    errors.date = 'Date is required';
  } else if (new Date(data.date) < new Date().setHours(0, 0, 0, 0)) {
    errors.date = 'Date cannot be in the past';
  }

  if (!data.time) {
    errors.time = 'Time is required';
  }

  if (!data.reason?.trim()) {
    errors.reason = 'Reason for visit is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateLoginForm = (data) => {
  const errors = {};

  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  }

  if (!data.password?.trim()) {
    errors.password = 'Password is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateRegisterForm = (data) => {
  const errors = {};

  if (!data.name?.trim()) {
    errors.name = 'Name is required';
  }

  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  }

  if (!data.password?.trim()) {
    errors.password = 'Password is required';
  } else if (data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};