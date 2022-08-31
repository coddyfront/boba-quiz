<template>
    <!-- Modal -->
    <div class="absolute  h-screen top-0 left-0 bottom-0 right-0 bg-slate-100  z-50  ">
        <!-- Modal Wrapper -->
        <div class="relative px-8 py-4 bg-white rounded-md flex flex-col gap-2 lg:w-1/2 mx-2 md:mx-auto my-4">
            <div class="absolute cursor-pointer text-rhino-500 w-8 h-8 right-4 top-4" @click="close">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <slot name="header">
                <header class="max-w-9/12">
                    Boba Quiz
                </header>
            </slot>
            
            <slot name="body">
                <div class="">
                    Вы создали Boba Quiz его можно пройти по ссылке
                </div>
            </slot>

            <slot name="footer">
                <footer class="">
                    <p class="text-xs mt-2 font-serif">Спасибо <span class="underline underline-offset-1 ">Max Still</span> за созданный Boba Quiz</p>
                </footer>
            </slot>
        </div>
    </div>
</template>

<script>

export default ({
   name: "Modal",
   methods: {
    close(){
        this.$emit('close')
    }
   },
   mounted(){
   }
})
</script>
