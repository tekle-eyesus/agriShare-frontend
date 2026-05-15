import { adminApi } from "../api/admin";
import { authApi } from "../api/auth";
import { commonApi } from "../api/common";
import { farmerApi } from "../api/farmer";
import { investorApi } from "../api/investor";

export const useAPI = () => {
  return {
    auth: authApi(),
    common: commonApi(),
    investor: investorApi(),
    farmer: farmerApi(),
    admin: adminApi(),
  };
};
