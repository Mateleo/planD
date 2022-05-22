<script lang="ts" setup>
import { useStore } from "@/stores/store";
import { ref } from "vue";
import Header from "./Header.vue";

const store = useStore();
let link = ref("");

function copy(text:string) {
  navigator.clipboard.writeText(text);
}

function route(plannerlink:string){
  return "/planner/"+plannerlink
}

store.fetchUserPlanners(store.getUserId);
</script>
<template>
  <Header></Header>
  <main class="bg-white w-1/2 flex flex-col rounded-xl p-5 text-black m-auto h-full">
    <div class="flex m-auto mb-5">
      <div><img class="rounded-full mr-5" :src="store.getAvatar" alt="" /></div>
      <h1 class="text-5xl m-auto">{{ store.getUsername }}</h1>
    </div>
    <div>
      <h2 class="font-bold text-xl text-black/80">My Plan</h2>
      <div
        v-for="planner in store.userData.planner"
        class="p-2 mb-2 rounded-lg flex bg-emerald-300"
      >
        <h3 class="text-2xl text-center m-auto ml-0">{{ planner.name }}</h3>
        <router-link
        :to="route(planner.link)"
          class="ml-auto bg-yellow-500 rounded-2xl p-2 px-4 font-bold text-lg shadow-lg group hover:outline hover:outline-4 hover:outline-red-200 hover:bg-gradient-to-br hover: from-fuchsia-600 hover:to-orange-600 hover:text-white transition-all ease-in duration-75"
        >
          OPEN
        </router-link>
        <div class="my-auto ml-3 hover:border-2 hover:border-green-700 border-2 border-transparent"
        @click="copy(planner.link)">
          <svg
            width="24"
            height="24"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 11.9976C14 9.5059 11.683 7 8.85714 7C8.52241 7 7.41904 7.00001 7.14286 7.00001C4.30254 7.00001 2 9.23752 2 11.9976C2 14.376 3.70973 16.3664 6 16.8714C6.36756 16.9525 6.75006 16.9952 7.14286 16.9952"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10 11.9976C10 14.4893 12.317 16.9952 15.1429 16.9952C15.4776 16.9952 16.581 16.9952 16.8571 16.9952C19.6975 16.9952 22 14.7577 22 11.9976C22 9.6192 20.2903 7.62884 18 7.12383C17.6324 7.04278 17.2499 6.99999 16.8571 6.99999"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <h2 class="font-bold text-xl text-black/80 mt-2">Join</h2>
      <input
        v-model="link"
        type="text"
        class="p-2 px-4 text-sm rounded-md bg-black/10 focus:outline-sky-400 mr-5 w-[35%] text-center"
        placeholder="R9M529B51PY2S93JGLY7"
      />
      <button
        @click="store.plannerJoin({ _id: store.getUserId,username:store.getUsername }, link)"
        class="px-4 py-[6px] bg-sky-400 font-bold text-white hover:bg-sky-500 transition-colors ease-in-out duration-150 rounded-md"
      >
        ADD
      </button>
    </div>
  </main>
</template>
