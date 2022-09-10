<template>
    <div class="quiz flex items-center justify-center" v-if="!error">
        <div class="flex flex-col justify-center items-start w-full md:w-big relative mb-5 rounded-lg bg-white px-6 py-3">
           
            <div v-show="!quizCompleted" class="w-full">
                <h2 class="text-slate-400 text-xl text-center w-full font-medium"><span class="relative font-bold text-xl ml-1">{{ this.questionNumber }}</span> Вопрос </h2>
                <span class="block w-full min-h-1 mt-2 bg-slate-300 overflow-x-hidden rounded-full">
                        <span class="relative block bg-rhino-500 h-1" :style="dividerWidth"></span>
                </span>
                <h2 v-html="loading ? 'Loading' : question" class="text-2xl my-4 text-center w-full font-medium"></h2>
              
                <ul class="flex flex-col gap-2 items-center p-2">
                    <li class="divide-2 flex cursor-pointer items-center gap-4 divide-rhino-400 rounded-md border-b-2 border-b-rhino-500 bg-rhino-50 px-4 py-2 leading-6 text-rhino-900 transition hover:scale-105 transform duration-300  hover:shadow-xl w-full justify-between" v-for="(answer,index) in answers" :key="index">
                        <div ></div>
                        <input type="radio" class="radio" name="right_answer" :id="index" :value="index" v-model="store.quiz[this.questionNumber].user_answer" v-show="typeOfQuestion==='radio'">
                        <input type="checkbox" :id="index" class="checkbox" name="checkbox" :value="index"   v-model="store.quiz[this.questionNumber].user_answers" v-show="typeOfQuestion==='multiple'">
                        <label type="text" :for="index" class="border-none cursor-pointer w-full px-4 py-2 resize-y leading-5 bg-transparent">{{answer}}</label>
                    </li>
                </ul>
            </div>
            <div class="mt-4 grid grid-cols-2 items-center gap-3 w-full" v-show="!quizCompleted">
                <button class="btn-secondary animate-scale-up-center" @click="store.questionNumber--"  :disabled="questionNumber == 0">Назад</button>
                <button class="btn-primary  justify-center group relative inline-flex animate-scale-up-center items-center gap-x-2" @click="nextQuestion">
                    <span class="absolute right-0 translate-x-full transition-transform group-hover:-translate-x-4">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>
                    <span class="transition-all group-hover:mr-4" @click="nextQuestion"> Дальше </span>
                </button>
            </div>
<!-- 
            <div v-show="quizCompleted" class="flex flex-col gap-1 mt-3 items-center justify-center w-full">
                <p>Правильно выбранно ответ {{this.quizResult.correct }} из {{ questions.length }}</p>
                <button @click="updateQuiz()" class="block w-full">Заново</button>
            </div> -->
        </div>
    </div>
</template>
<style scoped>

</style>
<script>
import { useSolveQuizStore } from '@/stores/quizSolve';
import {mapState,mapActions} from 'pinia';
export default {
    name: "QuizSolve2",
    data() {
        return {
            loading: false,
            finish: false,
            error: false,
        }
    },
    setup() {
        const store = useSolveQuizStore()
        return {store}
    },
    methods: {
        ...mapActions(useSolveQuizStore, ['plusQuestionNumber', 'minusQuestionNumber', 'setCorrectRadioAnswer', 'getQuizFromDB']),
       
        async nextQuestion() {
           if (this.questionNumber < this.store.quiz.length - 1) {
            this.store.questionNumber++
           }else {
            this.$router.push({name: 'quizResults', params: {quizId: this.store.quizId}, query: {username: this.store.username}})
           }
        },
        
    },
    computed: {
        ...mapState(useSolveQuizStore, {
            questionNumber: 'questionNumber',
            quizId: 'quiz',
            answers: (store) => store.quiz[store.questionNumber].answers,
            question: (store) => store.quiz[store.questionNumber].question,
            typeOfQuestion: (store) => store.quiz[store.questionNumber].typeOfQuestion
        }, ),
        dividerWidth() {
            let width = Math.floor((this.questionNumber * 100) / (this.store.quiz.length - 1))
            console.log(width)
            return {
                'width': width + '%',
            }
        },
        //
        quizCompleted() {
            if (this.finish == true) {
                return true
            } else {
                return false
            }
        }
    },
   
}
</script>
