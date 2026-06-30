export type UserT = {
    id: number,
    name: string,
    email: string
}

export type TodoT = {
    id: number,
    title: string;
    description: string;
    owner_id: number
}

export type OmitId = Omit<UserT, "id">
export type PickId = Pick<UserT, "id">