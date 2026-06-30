export type UserT = {
    id: number,
    name: string,
    email: string
}

export type TodoT = {
    id: string,
    title: string;
    description: string;
    owner_id: string
}

export type OmitId = Omit<UserT, "id">
export type PickId = Pick<UserT, "id">
export type Partial_OmitId = Partial<OmitId>