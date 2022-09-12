<template>
        <li class="w-full md:w-3/4 flex py-2 px-4 gap-2 justify-between items-center bg-rhino-50/50 rounded-md" v-for="(answer,index) in answers" :key="index">

            <input type="radio" :value="index" v-model="this.store.quiz[this.store.questionNumber].user_answer" :id="index" name="correct_answer" class="radio" v-show="typeOfQuestion === `radio`" :ref="`radio`+index" />
            <input type="checkbox" :value="index" v-model="this.store.quiz[this.store.questionNumber].user_answers" :id="index" name="correct_answers" class="checkbox" v-show="typeOfQuestion === `multiple`" :ref="`checkbox` + index" />
            <textarea type="text" v-model="answers[index]" class="w-full px-4 py-2 resize-y leading-6 bg-transparent rounded-none outline-none border-none focus:ring-0" rows="1" @input="resizeTextArea($event, index)" @focus="resizeTextArea($event, index)" draggable="false"></textarea>
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

import { useCreateQuizStore } from '@/stores/quiz';

export default {
    name: "QuizListAnswers",
    props: ['typeOfQuestion'],
    data(){
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
        deleteQuestion(index) {
        // console.log(index)
            this.resetRadioAnswer(this.questionNumber)
            this.answers.splice(index, 1)
            document.body.querySelectorAll('textarea').forEach(item => {
                item.style.height = item.scrollHeight + "px";
        })
      },
      
    
      resizeTextArea(e, index) {
        const elem = e.target;
        elem.style.height = elem.scrollHeight + "px";
       },
    },
   
    mounted(){
        document.body.querySelectorAll('textarea').forEach(item => {
           item.style.height = item.scrollHeight + "px";
        })
    },
    updated() {
        document.body.querySelectorAll('textarea').forEach(item => {
          item.style.height = item.scrollHeight + "px";
        })
      },

}
</script>
<style>
    textarea {
        resize: both !important;
    }
</style>