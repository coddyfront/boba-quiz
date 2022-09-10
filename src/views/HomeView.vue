<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="flex flex-col   w-full md:w-1/3 mx-auto mt-8 gap-2 bg-white rounded-md  justify-items-stretch px-8 py-4 ">
        <h1 class="text-2xl font-bold text-center mb-4">Вас приветсвует BOBA QUIZ</h1>
        <RouterLink :to="{name: 'solve'}">
          <button class="btn-primary animate-scale-up-center w-full">Пройти QUIZ
          </button>
        </RouterLink>

        <!-- <RouterLink :to="{name: 'create'}">
          <button class="btn-primary animate-scale-up-center w-full">Создать QUIZ
          </button>
        </RouterLink> -->
        <RouterLink :to="{name: 'create2'}">
          <button class="btn-primary animate-scale-up-center w-full">Создать QUIZ2
          </button>
        </RouterLink>
    </div>
</template>
<script>
  export default {
    name: "HomeView"
  }
</script>
