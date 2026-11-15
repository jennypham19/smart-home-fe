import { Dayjs } from "dayjs"

// Input
export interface UserPayload{
    avatarUrl?: string | null,
    fullName: string,
    phone?: string | null,
    account: string,
    password: string,
    email?: string | null,
    receivedJobDate?: Dayjs | null,
    role: string,
    address?: string | null
}

//Output
export interface IUser{
    id: string,
    fullName: string,
    account: string
    password: string,
    email: string,
    phone: string,
    address: string,
    status: number,
    isDeleted: number,
    role: string,
    createdAt?: string,
    updatedAt?: string,
    receivedJobDate: string,
    avatarUrl: string
}