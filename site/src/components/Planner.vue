<script lang="ts" setup>
import { useStore } from "@/stores/store";
import { computed, onMounted, onUnmounted, ref } from "vue";
import Header from "./Header.vue";
import Block from "./Block.vue";
import { useRouter, useRoute } from "vue-router";
import router from "@/router";

const store = useStore();
const route = useRoute();

let from = ref(1);
let to = ref(1);

let dateRange = ref();

function checker() {
  if (from.value > to.value) {
    from.value = 1;
  }
  let local = [];
  for (let x = from.value; x <= to.value; x++) {
    local.push(x);
  }
  dateRange.value = local;
  console.log(dateRange.value);
}
async function save() {
  let dateZone = [];
  dateZone.push(from.value + "-" + to.value);
  await store.updateUserDateZone(
    { _id: store.getUserId, datezone: dateZone },
    route.params.plannerlink.toString()
  );
  store.fetchUserPlanners(store.getUserId);
}

function dateZoneToRange(dateZone: any) {
  if (dateZone.length <= 0) {
    return [];
  }
  let from = parseInt(dateZone[0].split("-")[0]);
  let to = parseInt(dateZone[0].split("-")[1]);
  let local = [];
  for (let x = from; x <= to; x++) {
    local.push(x);
  }
  return local;
}

let width = ref(window.innerWidth);

function onchange() {
  width.value = window.innerWidth;
}

onMounted(() => window.addEventListener("resize", onchange));
onUnmounted(() => window.removeEventListener("resize", onchange));
let test = computed(() => (width.value <= 730 ? true : false));

function resposive(x:number) {
  if (test.value) {
    return x == 1 || x == 31 ? x : undefined;
  }else{
    return x
  }
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

store.fetchUserPlanners(store.getUserId);
</script>
<template>
  <Header></Header>
  <main class="flex flex-wrap flex-col-reverse md:flex-row m-1 md:m-4 text-black">
    <div class="w-full mb-6 text-white order-4 md:order-1">
      <h1 class="text-xl md:text-5xl text-center">
        Planner :
        {{
          store.userData.planner.find(
            (planner) => planner.link == $route.params.plannerlink
          )?.name
        }}
      </h1>
    </div>
    <div class="w-full md:w-fit order-2">
      <div class="bg-white rounded-lg p-4 md:mr-4 flex-col m-auto w-fit">
        <h1>My dates</h1>
        <div class="flex">
          <div>
            <p>FROM</p>
            <input
              class="text-center border-2 border-black rounded-sm aspect-square w-12 h-12 mr-5 p-[1px]"
              type="number"
              name=""
              id=""
              v-model="from"
              min="1"
              max="31"
              @input="checker()"
            />
          </div>
          <div>
            <p>TO</p>
            <input
              class="text-center border-2 border-black rounded-sm aspect-square w-12 h-12 p-[1px]"
              type="number"
              name=""
              id=""
              v-model="to"
              min="1"
              max="31"
              @input="checker"
            />
          </div>
        </div>
        <button
          @click="save"
          class="mt-3 bg-blue-500 rounded-lg text-white p-1 px-3 font-bold text-lg shadow-lg group hover:outline hover:outline-4 hover:outline-blue-200 hover:bg-gradient-to-br hover: from-emerald-600 hover:to-lime-600 hover:text-white transition-all ease-in duration-75"
        >
          Save
        </button>
      </div>
    </div>
    <div class="bg-white rounded-lg p-1 md:p-4 grow w-full md:w-fit md:mt-0 mb-3 order-3">
      <div class="flex">
        <p
          class="mb-3 mr-1 md:mr-5 text-sm md:text-2xl font-bold md:w-[130px] w-[90px]"
        ></p>
        <div class="grid gridcols grow">
          <div v-for="i in 31">
            <div>{{ resposive(i) }}</div>
          </div>
        </div>
      </div>
      <div
        class="mb-5"
        v-for="user in store.userData.planner.find(
          (planner) => planner.link == $route.params.plannerlink
        )?.users"
      >
        <div class="flex">
          <p
            class="mb-3 mr-1 md:mr-5 text-sm md:text-2xl font-bold md:w-[130px] w-[90px]"
          >
            {{ user.username }}
          </p>
          <div class="grid gridcols grow">
            <div v-for="i in 31">
              <Block :id="i" :dateRange="dateZoneToRange(user.datezone)"></Block>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
.gridcols {
  grid-template-columns: repeat(31, minmax(0, 1fr));
}
</style>
