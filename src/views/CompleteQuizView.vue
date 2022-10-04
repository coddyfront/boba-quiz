<template>
    <div class="quiz flex items-center justify-center w-full" v-if="!error">
        <div class="flex flex-col justify-center items-start w-full md:w-xl max-w-[512px] relative m-4 rounded-xl bg-white/90  z-0 border-2 ">
            <div class="flex absolute -top-[16px] w-full items-center justify-center z-20">
                <span class="rounded-full px-2 py-1 bg-rhino-100 leading-snug font-bold text-rhino-400 text-sm ">{{ this.questionNumber }} вопрос</span>
            </div>
            <h2 class="text-xl mt-6 text-center w-full font-medium mx-auto px-3" >{{this.question}}  </h2>
            <ul class="flex flex-col gap-3 items-center p-2 px-6 mt-3 w-full">
                <li class="flex w-full rounded-lg bg-zink-100 px-4 py-2 items-center text-lg tracking-wide leading-6 text-rhino-900 ring-rhino-300 ring-1 cursor-pointer" v-for="(answer,index) in answers" :key="index">
                    <input type="radio" class="radio" name="right_answer" :id="index" :value="index" v-model="store.quiz[this.questionNumber].right_answer" v-if="typeOfQuestion==='radio'">
                    <input type="checkbox" :id="index" class="checkbox" name="checkbox" :value="index"   v-model="store.quiz[this.questionNumber].right_answers" v-if="typeOfQuestion==='multiple'">
                    <label type="text" :for="index" class="border-none cursor-pointer w-full px-4 py-2 resize-y leading-5 bg-transparent">{{answer}}</label>
                </li>
                <div class="mt-4 grid grid-cols-2 items-center gap-3 w-full" v-show="!quizCompleted">
                <button class="btn-secondary animate-scale-up-center" @click="store.questionNumber--"  :disabled="questionNumber == 0">Назад</button>
                <button class="btn-primary  justify-center group relative inline-flex animate-scale-up-center items-center gap-x-2" @click="nextQuestion">
                    <span class="absolute right-0 translate-x-full transition-transform group-hover:-translate-x-4">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>
                    <span class="transition-all group-hover:mr-4" > Дальше </span>
                </button>
            </div>
            </ul>
           
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
import useAuthUser from '@/composables/useAuthUser'
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
        const store = useSolveQuizStore();
        store.questionNumber = 0;
        return {store}
    },
    methods: {
        ...mapActions(useSolveQuizStore, ['plusQuestionNumber', 'minusQuestionNumber', 'setCorrectRadioAnswer', 'getQuizFromDB', 'saveResults']),
       
        async nextQuestion() {
           if (this.questionNumber < this.store.quiz.length - 1) {
            this.store.questionNumber++
           }else {
            await this.saveResults()
            const {user} = useAuthUser()
            const username = user.value.user_metadata.name
            this.$router.push({name: 'quizResults', params: {quizId: this.store.quizId, username: username}})
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
