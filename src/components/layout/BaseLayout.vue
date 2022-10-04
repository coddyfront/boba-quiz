<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
    <div class="w-full ">
        <header class="bg-rhino-700 text-white  py-2 px-4 flex justify-between items-center ">
            <!-- Logo div -->
            <keep-alive>
                <div class="">
                    <RouterLink to="/" class="flex items-center gap-x-2 text-xl font-bold ">
                        <div class="bg-rhino-100 p-2 rounded-full w-12 h-12 flex items-center justify-center">
                           <img class="pop object-fill w-10 h-10"  src="/logo.svg" alt="">
                        </div>
                        Boba Quiz
                    </RouterLink>
                </div>
            </keep-alive>
            <slot name="header"></slot>
        </header>
        <main class="min-h-[65vh] mt-4 flex flex-col items-center">
            <slot name="main"></slot>
        </main>
        <footer class="bg-rhino-700 text-white w-full py-2 px-4 flex flex-col items-center justify-center text-sm">

            <keep-alive>
                <slot name="footer"></slot>
            </keep-alive>

        </footer>
    </div>    
</template>

<script>

</script>
