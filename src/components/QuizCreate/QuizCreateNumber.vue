<template >
    <h2 class="text-base text-rhino-100 bg-rhino-600 px-2 leading-tight rounded-full"><span class="relative font-black mr-1">{{ number }}</span>вопрос </h2>
</template>
<script setup>
    import {defineProps} from 'vue'
    const props = defineProps({
        number: Number
    })
</script>