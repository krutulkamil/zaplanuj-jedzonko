export interface AuthUser {
    name?: string;
    email: string;
    password: string;
}

export interface User {
    token: string;
    user: UserInformation;
}

export interface UserInformation {
    _id:   string;
    name:  string;
    email: string;
    role:  number;
    __v:   number;
}