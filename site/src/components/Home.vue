<script lang="ts" setup>
import { useStore } from "@/stores/store";
import { ref } from "vue";
import Header from "./Header.vue";

function nextStep() {
  
  const store = useStore();
  console.log(store.getUsername);
  if (!store.getUsername) {
    window.location.href =  "/login";
  } else {
    window.location.href =  "/mypanel";
  }
}

</script>
<template>
  <Header></Header>
  <main class="text-4xl mt-5 text-center flex flex-wrap w-[70%] m-auto">
    <div class="w-full text-center text-4xl font-bold my-5">
      The best planner for your holliday
    </div>
    <div class="w-1/2 text-2xl m-auto text-justify pr-4">
      Bored of trying to plan your holliday with your friend ? <br>
      You have the perfect destination with your friends in mind but you can't find a date where you are all available ? <br>
      Don't look elsewhere we have the solution <br>
    </div>
    <div class="w-1/2"><img class="m-auto" src="https://picsum.photos/600" alt="" /></div>
    <div class="w-full mt-10">
     
      <button
        @click="nextStep"
        class="m-auto bg-yellow-500 rounded-2xl p-3 font-bold text-2xl shadow-lg group hover:outline hover:outline-4 hover:outline-red-200 hover:bg-gradient-to-br hover: from-fuchsia-600 hover:to-orange-600 hover:text-white transition-all ease-in duration-75"
      >
        Next Step
      </button>
    </div>
  </main>
</template>
