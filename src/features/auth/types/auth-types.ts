export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    username?: string;
    email: string;
    password: string;
}

export interface User {
    id: string;
    email: string;
    username: string;
    avatar?: string;
    role: UserRole;
}

export interface AuthResponse {
    access_token: string;
    access_token_expires_in: number;
    user: User;
}

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}