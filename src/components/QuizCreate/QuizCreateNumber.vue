<template >
    <h2 class="text-xl font-medium"><span class="relative font-bold font-mono text-2xl ml-1">{{ number }}</span> Вопрос </h2>
    
</template>
<script>
    export default {
        name: "QuizCreateNumber",
        props:['number']
    }
</script>