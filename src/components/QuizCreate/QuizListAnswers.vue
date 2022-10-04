<template>
        <li class="w-full md:w-10/12 flex py-2 px-4 gap-2 justify-between items-center bg-stone-50/50 rounded-lg ring-rhino-50 ring-2" v-for="(answer,index) in answers" :key="index">
            <input type="radio" :value="index" v-model="this.store.quiz[this.store.questionNumber].user_answer" :id="index" name="correct_answer" class="radio" v-show="typeOfQuestion === `radio`" :ref="`radio`+index" />
            <input type="checkbox" :value="index" v-model="this.store.quiz[this.store.questionNumber].user_answers" :id="index" name="correct_answers" class="checkbox" v-show="typeOfQuestion === `multiple`" :ref="`checkbox` + index" />
            <QuizTextArea :questionNumber="this.store.questionNumber" :textareaId="index" />
            <!-- <textarea v-model="answers[index]" class="textarea" rows="1" @input="resizeTextArea($event)" @focus="resizeTextArea($event)" draggable="false" :ref="`textarea` "></textarea> -->
            <div @click="deleteQuestion(index)">
                <button class="h-max flex item-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6  stroke-rhino-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
              </div>
        </li>
</template>
<script>
import { mapActions, mapState } from 'pinia' ;
import QuizTextArea from './QuizTextArea.vue';
import { useCreateQuizStore } from '@/stores/quiz';
export default {
    name: "QuizListAnswers",
    data(){
        return {
            arrayy: [1,2,3,4]
        }
    },
    props: ['typeOfQuestion'],
    components: {
        QuizTextArea
    },
    updated(){
        console.log("Updated")
    }, 
    computed: {
        questionNumber(){
            return this.store.questionNumber
        },
        answers(){
            return this.store.quiz[this.store.questionNumber].answers
        }
    },
    setup(){
        const store = useCreateQuizStore()
        return {store}
    },
    methods: {
        ...mapActions(useCreateQuizStore, ['setCorrectRadioAnswer','setCorrectMultipleAnswers','resetRadioAnswer']),
        async deleteQuestion(index) {
            console.log(index)
            await this.store.quiz[this.store.questionNumber].answers.splice(index, 1)
        }
    },
}
</script>
<style>
    textarea {
        resize: none !important;
        min-height: 0;
    }
</style>