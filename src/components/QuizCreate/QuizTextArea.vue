<script setup>
    import {onMounted, onUpdated, ref, defineProps, toRefs, toRef} from 'vue';
    import { storeToRefs } from 'pinia'
    import {useCreateQuizStore} from '@/stores/quiz'
    const props = defineProps({
        questionNumber: Number,
        textareaId: Number
    });
    const textarea = ref(null)
    const store = storeToRefs(useCreateQuizStore())
    // const {answers} = store.quiz[props.questionNumber]
    // const {answer} = toRef(store.quiz[props.questionNumber].answers[props.questionNumber])
    // answers.value[1] = '111111'
    // let answer = answers.value[props.textareaId]
    console.log(store.quiz.value[props.questionNumber].answers)
    onMounted(()=> {
        resize()
        // console.log(props.textareaId, answer.value)
    });
    onUpdated(()=> {
        resize()
        // console.log(props.textareaId, answer.value)
    });
    function resize(){
        textarea.value.style.height = 1 + "px";
        textarea.value.style.height = textarea.value.scrollHeight  + "px";
    }
 
</script>

<template>
   <textarea type="text" class="textarea overflow-hidden" rows="1"  draggable="false" ref="textarea" v-model.trim="store.quiz.value[props.questionNumber].answers[props.textareaId]" @input="resize" @change="resize" @focus="resize"></textarea>
</template>

