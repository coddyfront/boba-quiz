<template>
    <span
        class="absolute hidden group-focus:flex -left-1/2 -top-3 -translate-y-full px-2 py-1 bg-rhino-700 rounded-lg text-center text-white text-sm after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-rhino-700 ">{{ message }}</span>
</template>

<script>
    export default {
        name: "SimpleTooltip",
        props: ['message'],
        created(){
            console.log(1)
        }
    }
</script>