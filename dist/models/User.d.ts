import type { UserT } from '@/types';
export default class User {
    name: string;
    email: string;
    id: number | undefined;
    constructor({ ...data }: UserT);
    save(): Promise<UserT>;
    static findById(id: Pick<UserT, "id">): Promise<UserT>;
    static find(): Promise<{
        data: UserT[];
        count: number;
    }>;
    static update(id: Pick<UserT, "id">, record: Omit<UserT, "id">): Promise<UserT>;
    static delete(id: Pick<UserT, "id">): Promise<UserT>;
}
//# sourceMappingURL=User.d.ts.map