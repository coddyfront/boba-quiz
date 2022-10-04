<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    </script>
    
<template>
    <div class="mx-2 md:w-3/4 lg:w-2/4 ring-2 ring-rhino-600 ring-inset md:mx-auto lg:mt-16 mt-4 rounded-3xl bg-white max-w-md drop-shadow-xl drop-shadow-rhino-500 ">
        <div class="w-full rounded-t-3xl grid grid-cols-2 place-content-center">
                <RouterLink :class="[' rounded-tl-3xl flex items-center justify-center md:py-4 py-2  font-semibold text-base ', $route.name === 'login' ? 'text-white bg-rhino-700' : 'text-rhino-50 bg-rhino-600']" :to="{name: 'login'}">Логин</RouterLink>
                <RouterLink :class="['rounded-tr-3xl flex items-center justify-center md:py-4 py-2  font-semibold text-base ', $route.name === 'register' ? 'text-white bg-rhino-700' : 'text-rhino-50 bg-rhino-600']"  :to="{name: 'register'}">Регистрация</RouterLink>
        </div>
        <RouterView />
    </div>
</template>

<script>
export default {
    name: 'AuthView'
}
</script>