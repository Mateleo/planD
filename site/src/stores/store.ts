import { defineStore } from "pinia";

import axios from "axios";
// import qs from "qs";

interface user {
  _id: string;
  googleId: string;
  avatar: string;
  username: string;
}

export const useStore = defineStore("main", {
  state: () => ({
    userData: {} as user,
  }),
  getters: {
    getUsername(state) {
      return state.userData.username;
    },
    getAvatar(state){
      return state.userData.avatar
    },
    getUserId(state){
      return state.userData._id
    }
  },
  actions: {
    async fetchProfile() {
      const response = await axios.get(import.meta.env.VITE_API_URL + "/cards", {
        withCredentials: true,
      });
      this.userData = response.data;
      console.log("fetch profile");
      console.log(this.userData);
    },
    auth(connection: string) {
      console.log(import.meta.env.VITE_API_URL + "/auth/" + connection);
      return import.meta.env.VITE_API_URL + "/auth/" + connection;
    },
    setUserData(payload:user){
      this.userData = payload
    }
  },
});
