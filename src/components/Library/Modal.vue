<template>
    <!-- Modal -->
    <Transition name="bounce">
    <div class="flex items-center justify-center fixed overflow-hidden top-0 left-0 bottom-0 right-0 bg-rhino-100/70  z-50  ">
        <!-- Modal Wrapper -->
        <div class="fixed px-8 py-4 bg-white rounded-lg flex flex-col gap-2 w-10/12  my-2 sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 mx-2 md:mx-auto ring-4 ring-rhino-400">
            <div class="absolute cursor-pointer text-rhino-500 right-4 top-3 " @click="close">
                <button class=" transition duration-300 hover:scale-110 active:scale-75">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-9 w-9 cursor-pointer stroke-rhino-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
            <slot name="header">
                <header class="max-w-9/12 mt-2 flex items-center justify-center flex-col">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="md:w-24 md:h-24 w-16 h-16 stroke-rhino-400">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                    </svg>
                    <p class="inline-flex items-end gap-1 text-lg font-medium mt-4">
                        Квиз успешно создан &#128293;
                    </p>
                </header>
            </slot>
            
            <slot name="body">
                <div class="w-full mt-2 bg-rhino-50">
                    Вы создали Boba Quiz его можно пройти по ссылке
                </div>
            </slot>

            <slot name="footer">
                <footer class="">
                    <p class="text-xs mt-2 font-serif">Спасибо <span class="underline underline-offset-1 ">{{this.username}}</span> за созданный Boba Quiz</p>
                </footer>
            </slot>
        </div>
    </div>
    </Transition>
</template>

<script>
import useAuthUser from '@/composables/useAuthUser'
export default ({
   name: "Modal",
   data(){
    return {
        username: ''
    }
   },
   methods: {
    close(){
        this.$emit('close')
    }
   },
   mounted(){
   const {user} = useAuthUser()
   this.username = user.value.user_metadata.name
   }
})
</script>
<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
