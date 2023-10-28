import { UserType } from "./user.types"

export type HashType = {
    _id: string
    parentId: string
    text: string
    author: UserType
    community: string[] | null
    children: HashType[]
    media: MediaType[]
    likes: string[]
    reposts: string[]
    views: number
    createdAt: Date
}

export type MediaType = {
    id: string;
    url: string;
    alt: string;
}