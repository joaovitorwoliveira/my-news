export interface User {
  id?: number;
  email: string;
  password?: string;
  name?: string;
}

export interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}
