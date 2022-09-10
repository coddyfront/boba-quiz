<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
    <div class="w-full ">
        <header class="bg-rhino-700 text-white  py-2 px-4 flex justify-between items-center ">
            <!-- Logo div -->
            <keep-alive>
                <div class="">
                    <RouterLink to="/" class="flex items-center gap-x-2 text-xl font-bold">
                        <img class="pop object-fill w-8 h-8 rounded-full"  src="https://play-lh.googleusercontent.com/Mj_MnS1Rfw57dG529XDloAAEFlKBgZNVYXQepGCkdiEz77seAkbR0uUAlK69WNAvylc" alt="">
                        Boba Quiz
                    </RouterLink>
                </div>
            </keep-alive>
            <slot name="header"></slot>
        </header>
        <main class="min-h-[65vh] mt-4 ">
            <slot name="main"></slot>
        </main>
        <footer class="bg-rhino-700 text-white w-full py-2 px-4 flex flex-col items-center justify-center text-sm">
            <slot name="footer"></slot>
        </footer>
    </div>    
</template>

<script>

</script>
