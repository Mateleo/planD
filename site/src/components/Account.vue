<script lang="ts" setup>
import { useStore } from "@/stores/store";
import Header from "./Header.vue";

const store = useStore()

store.fetchUserPlanners(store.getUserId)

</script>
<template>
  <Header></Header>
  <main class="bg-white w-1/2 flex flex-col rounded-xl p-5 text-black m-auto h-full">
    <div class="flex m-auto mb-5">
      <div><img class="rounded-full mr-5" :src="store.getAvatar" alt="" /></div>
      <h1 class="text-5xl m-auto">{{store.getUsername}}</h1>
    </div>
    <div>
      <h2 class="font-bold text-xl text-black/80">My Plan</h2>
      <div v-for="planner in store.userData.planner" class="p-2 rounded-lg flex bg-emerald-300">
        <h3 class="text-2xl text-center m-auto ml-0">{{planner.name}}</h3>
        <button
          class="ml-auto bg-yellow-500 rounded-2xl p-2 px-4 font-bold text-lg shadow-lg group hover:outline hover:outline-4 hover:outline-red-200 hover:bg-gradient-to-br hover: from-fuchsia-600 hover:to-orange-600 hover:text-white transition-all ease-in duration-75"
        >
          OPEN
        </button>
      </div>
    </div>
  </main>
</template>
