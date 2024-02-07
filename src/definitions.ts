import exp from "node:constants";

export interface createUserParams {
    "firstName": string,
    "lastName": string,
    "email": string,
    "password": string
}

export interface UserInterface {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    isVerified: boolean
}