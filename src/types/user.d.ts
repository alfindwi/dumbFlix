export interface IUser {
    id: number;
    email: string;
    password: string;
    fullname: string;
    address: string;
    phone: string;
    image?: string;
    role?: string;
}