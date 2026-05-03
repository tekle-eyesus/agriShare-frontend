import { adminApi } from "../api/admin";
import { commonApi } from "../api/common";
import { farmerApi } from "../api/farmer";
import { investorApi } from "../api/investor";

export const useAPI = () => {
  return {
    common: commonApi(),
    investor: investorApi(),
    farmer: farmerApi(),
    admin: adminApi(),
  };
};
