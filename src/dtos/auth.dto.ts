export interface RegisterUserDto {
    name: string;
    email: string;
    password: string;
    role?: 'admin' | 'client';
  }
  
  export interface LoginUserDto {
    email: string;
    password: string;
  }
  
  export interface AuthResponseDto {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  }