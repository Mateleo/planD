<script lang="ts" setup>
import { useStore } from "@/stores/store";
import { ref } from "vue";
import Header from "./Header.vue";

const store = useStore();

let name = ref("");
let date = ref("");
let visible = ref(false);
let code = generateCode();

function log() {
  console.log(name.value, date.value);
  visible.value = true;
  store.putPlanner({
    name: name.value,
    users: [{ userId: store.userData._id, datezone: [] }],
    link: code,
  });
}

function generateCode() {
  const Alphabet = "ABCDEFGHIJKLMOPQSRSTUVWXYZ";
  const NumberList = "1234567890";
  let code = [];
  for (let x = 0; x < 20; x++) {
    if (Math.random() >= 0.5) {
      code.push(Alphabet[Math.floor(Math.random() * Alphabet.length)]);
    } else {
      code.push(NumberList[Math.floor(Math.random() * NumberList.length)]);
    }
  }
  return code.join("");
}
</script>
<template>
  <Header></Header>
  <main class="flex flex-col text-black bg-white rounded-xl w-[80%] m-auto p-4">
    <h1 class="text-4xl text-center font-bold">Planner Creator</h1>
    <h2 class="text-black/80 text-2xl mt-2">Name</h2>
    <input
      type="text"
      v-model="name"
      placeholder="Summer July with friends..."
      class="shadow appearance-none border rounded py-3 px-3 leading-tight focus:outline-blue-500"
      required
    />
    <h2 class="text-black/80 text-2xl mt-4">Month</h2>
    <input
      v-model="date"
      type="month"
      class="shadow appearance-none border rounded py-3 px-3 leading-tight focus:outline-blue-500"
      required
    />
    <div v-if="visible">
      <h2 class="text-black/80 text-2xl mt-4">Link</h2>
      <p
        class="font-bold shadow appearance-none border rounded py-3 px-3 leading-tight focus:outline-blue-500"
      >
        {{ code }}
      </p>
    </div>
    <button
      v-else
      @click="log"
      class="m-auto mt-6 bg-blue-500 rounded-lg text-white p-2 px-4 font-bold text-lg shadow-lg group hover:outline hover:outline-4 hover:outline-blue-200 hover:bg-gradient-to-br hover: from-emerald-600 hover:to-lime-600 hover:text-white transition-all ease-in duration-75"
    >
      Generate
    </button>
  </main>
</template>
