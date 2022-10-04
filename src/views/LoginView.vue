<template>
    <form @submit.prevent="handleLoginForm" class="flex flex-col gap-3 px-4 py-2 min-h-fit mt-4 mb-2  min-w-[280px]">
        <div class="relative">
          <input v-model="form.email" type="email" id="floating_outlined" class="  block px-2.5 pb-2.5 pt-4 w-full text-sm bg-white text-rhino-900 bg-transparent rounded-lg border-2 border-rhino-200 appearance-none   focus:outline-none focus:ring-0 focus:border-rhino-600 peer" placeholder=" " />
          <label for="floating_outlined" class="absolute text-sm text-rhino-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-rhino-600 peer-focus:dark:text-rhino-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Почта</label>
        </div>
        <div class="relative">
          <input v-model="form.password" type="password" id="floating_outlined_password" class="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-white text-rhino-900 bg-transparent rounded-lg border-2 border-rhino-200 appearance-none  focus:outline-none focus:ring-0 focus:border-rhino-600 peer" placeholder=" " />
          <label for="floating_outlined_password" class="absolute text-sm text-rhino-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-rhino-600 peer-focus:dark:text-rhino-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Пароль</label>
        </div>
        <button type="submit" name="submit" class="btn-primary w-full">Войти</button>

    </form> 
</template>
<script setup>
    import { ref } from "vue";
    import useAuthUser from "@/composables/useAuthUser";
    import { useRouter } from "vue-router";
    const router = useRouter();

    const { login } = useAuthUser();

    const form = ref({
      email: "",
      password: "",
    });
    const handleLoginForm = async () => {
      try {
        await login(form.value)
        router.push({ name: "home" });
      } catch (error) {
        alert(error.message);
      }
    };
</script>