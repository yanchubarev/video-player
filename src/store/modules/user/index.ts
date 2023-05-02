import { Commit, Dispatch } from "vuex";
import { UserStoreState } from "@/store/modules/user/types";
import { User } from "@/types/user";
import { UserService } from "@/services/UserService";
const userService = new UserService();

export const userModule = {
  state: (): UserStoreState => ({
    user: {
      id: "",
      isLoggedIn: false,
    },
  }),
  mutations: {
    USER_LOG_IN(state: UserStoreState) {
      state.user.isLoggedIn = true;
    },
    USER_LOG_OUT(state: UserStoreState) {
      state.user.isLoggedIn = false;
    },
    SET_USER(state: UserStoreState, user: User) {
      state.user = user;
    },
  },
  actions: {
    async logInUser({
      commit,
      state,
    }: {
      commit: Commit;
      state: UserStoreState;
    }) {
      userService.setUserInfo({
        id: state.user.id,
        isLoggedIn: true,
      });
      commit("USER_LOG_IN");
    },

    async logOutUser({
      commit,
      state,
    }: {
      commit: Commit;
      state: UserStoreState;
    }) {
      userService.setUserInfo({
        id: state.user.id,
        isLoggedIn: false,
      });
      commit("USER_LOG_OUT");
    },

    async setUserInfo(
      { commit, state }: { commit: Commit; state: UserStoreState },
      user: User
    ) {
      try {
        commit("SET_USER", user);
      } catch (error) {
        console.log("error");
      }
    },
  },
  getters: {
    user: (state: UserStoreState) => state.user,
  },
};
