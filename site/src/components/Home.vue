<script lang="ts" setup>
import Header from "./Header.vue";
</script>
<template>
  <Header></Header>
  <main class="text-4xl mt-5 text-center flex flex-wrap w-[70%] m-auto">
    <div class="w-full text-center text-4xl font-bold my-5">
      The best planner for your holliday
    </div>
    <div class="w-1/2 text-2xl m-auto text-justify pr-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam voluptatum dolorem
      sed alias incidunt? Minus, voluptate rem quas expedita recusandae dolores officia
      fuga! Illum placeat asperiores sapiente iste sit recusandae.
    </div>
    <div class="w-1/2"><img class="m-auto" src="https://picsum.photos/600" alt="" /></div>
    <div class="w-full mt-10">
      <router-link
        to="/login"
        class="m-auto bg-yellow-500 rounded-2xl p-3 font-bold text-2xl shadow-lg group hover:outline hover:outline-4 hover:outline-red-200 hover:bg-gradient-to-br hover: from-fuchsia-600 hover:to-orange-600 hover:text-white transition-all ease-in duration-75"
      >
        REGISTER
      </router-link>
    </div>
  </main>
</template>
