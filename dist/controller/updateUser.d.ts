import type * as UserT from "@/types";
import type { RequestHandler } from "express";
type Params = {
    user_id: UserT.PickId;
};
declare const updateUsers: RequestHandler<Params, UserT.UserT, UserT.OmitId>;
export default updateUsers;
//# sourceMappingURL=updateUser.d.ts.map