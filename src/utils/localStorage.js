export const setToken = (token) => localStorage.setItem('pharmacy_token', token);
export const getToken = () => localStorage.getItem('pharmacy_token');

export const setRole = (role) => localStorage.setItem('pharmacy_role', role);
export const getRole = () => localStorage.getItem('pharmacy_role');