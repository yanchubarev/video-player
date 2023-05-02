import { User } from "@/types/user";
import LocalStorage from "@/classes/LocalStorageClass";

export class UserService {
  getUserInfo(): User {
    try {
      const response = LocalStorage.getItem("user");
      return response;
    } catch (error) {
      throw new Error();
    }
  }

  setUserInfo(user: User): void {
    try {
      LocalStorage.setItem("user", user);
    } catch (error) {
      throw new Error();
    }
  }
}
