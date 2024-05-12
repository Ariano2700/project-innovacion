const isPasswordValid = (password: string): boolean => {
  // La contraseña debe tener al menos 6 caracteres y al menos una letra mayúscula, una minúscula y un número
  // The password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter and one number.
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return passwordRegex.test(password);
};
export default isPasswordValid;
