import { Models } from "node-appwrite";

export enum MemberRole {
    ADMIN = "ADMIN",
    MEMBER = "MEMBER"
}

export type Member = Models.Document & {
    id: string;
    name: string;
    email: string;
    role: MemberRole;
}