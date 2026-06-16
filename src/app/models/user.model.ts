export interface User {
  id: number;

  username: string;

  password: string;

  fullName: string;

  role: string;

  permissions: string[];

  email: string;

  phone: string;

  active: boolean;

  createdDate: string;

  updatedDate: string;

  createdBy: string;

  updatedBy: string;

  lastLogin: string;

  passwordChangedDate: string;

  failedAttempts: number;

  locked: boolean;

  photo?: string;
}
