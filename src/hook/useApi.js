import { adminApi } from "../api/admin";
import { authApi } from "../api/auth";
import { commonApi } from "../api/common";
import { multipleUsersApi } from "../api/multipleUsers";
import { farmerApi } from "../api/farmer";
import { investorApi } from "../api/investor";
import { paymentApi } from "../api/payment";

export const useAPI = () => {
  return {
    auth: authApi(),
    common: commonApi(),
    multipleUsers: multipleUsersApi(),
    investor: investorApi(),
    farmer: farmerApi(),
    admin: adminApi(),
    payment: paymentApi(),
  };
};
