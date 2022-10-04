<template>
    <form @submit.prevent="handleRegisterForm" class="flex flex-col gap-3 px-4 py-2 min-h-fit mt-4 min-w-[280px] mb-2">
      <div class="relative">
          <input v-model="form.name" type="text"  id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-white text-rhino-900 bg-transparent rounded-lg border-2 border-rhino-200 appearance-none    focus:outline-none focus:ring-0 focus:border-rhino-600 peer" placeholder=" " />
          <label for="floating_outlined" class="absolute text-sm text-rhino-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-rhino-600 peer-focus:dark:text-rhino-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Имя</label>
        </div>
        <div class="relative">
          <input v-model="form.email" type="email" id="floating_outlined_email" class="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-white text-rhino-900 bg-transparent rounded-lg border-2 border-rhino-200 appearance-none    focus:outline-none focus:ring-0 focus:border-rhino-600 peer" placeholder=" " />
          <label for="floating_outlined_email" class="absolute text-sm text-rhino-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-rhino-600 peer-focus:dark:text-rhino-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Почта</label>
        </div>
        <div class="relative">
          <input v-model="form.password" type="password" id="floating_outlined_password" class="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-white text-rhino-900 bg-transparent rounded-lg border-2 border-rhino-200 appearance-none    focus:outline-none focus:ring-0 focus:border-rhino-600 peer" placeholder=" " />
          <label for="floating_outlined_password" class="absolute text-sm text-rhino-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-rhino-600 peer-focus:dark:text-rhino-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Пароль</label>
        </div>
        <button type="submit" name="submit" class="btn-primary w-full">Зарегистрироваться</button>
    </form>
</template>
<script setup>
    import { ref } from "vue";
    import { useRouter } from "vue-router";
    import { useUserStore } from '@/stores/userStore'
    const store = useUserStore()
    const router = useRouter();

    const form = ref({
      email: "",
      password: "",
      name: ""
    });
    const handleRegisterForm = async () => {
      try {
        const { signUp } = store
        const error = await signUp(form)
        if (error) {
            alert(error.message)
        }else {
            router.push({
            name: "home",
        })
        }
        
      } catch (error) {
        alert(error.message);
      }
    };
</script>