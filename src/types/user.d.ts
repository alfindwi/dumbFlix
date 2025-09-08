export interface IUser {
    id: number;
    email: string;
    password: string;
    fullName: string;
    address: string;
    phone: string;
    image?: string;
    role?: string;
    status?: string;
}