<script lang="ts" setup>
import { useStore } from "@/stores/store";
import { ref } from "vue";
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
function save() {
  let dateZone = [];
  dateZone.push(from.value + "-" + to.value);
  store.updateUserDateZone(
    { _id: store.getUserId, datezone: dateZone },
    route.params.plannerlink.toString()
  );
}

function dateZoneToRange(dateZone: any) {
  if(dateZone.length<=0){
    return []
  }
  let from = parseInt(dateZone[0].split("-")[0]);
  let to = parseInt(dateZone[0].split("-")[1]);
  let local = [];
  for (let x = from; x <= to; x++) {
    local.push(x);
  }
  return local;
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
  <main class="flex flex-wrap m-4 text-black">
    <div class="w-full mb-6 text-white">
      <h1 class="text-5xl text-center">
        Planner :
        {{
          store.userData.planner.find(
            (planner) => planner.link == $route.params.plannerlink
          )?.name
        }}
      </h1>
    </div>
    <div class="bg-white rounded-lg p-4 mr-4 flex-col">
      <h1>My dates</h1>
      <div class="flex">
        <div>
          <p>FROM</p>
          <input
            class="border-2 border-black rounded-sm aspect-square w-12 h-12 mr-5 p-[1px]"
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
            class="border-2 border-black rounded-sm aspect-square w-12 h-12 p-[1px]"
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
        class="w-full mt-3 bg-blue-500 rounded-lg text-white p-1 px-3 font-bold text-lg shadow-lg group hover:outline hover:outline-4 hover:outline-blue-200 hover:bg-gradient-to-br hover: from-emerald-600 hover:to-lime-600 hover:text-white transition-all ease-in duration-75"
      >
        Save
      </button>
    </div>
    <div class="bg-white rounded-lg p-4 grow">
      <div
        class="mb-5"
        v-for="user in store.userData.planner.find(
          (planner) => planner.link == $route.params.plannerlink
        )?.users"
      >
        <div class="flex">
          <p class="mb-3 mr-5 text-2xl font-bold">
            {{user.username}}
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
