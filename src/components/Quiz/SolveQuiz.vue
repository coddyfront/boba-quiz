<template>
    <div class="quiz flex items-center justify-center" v-if="!error">
        <div class="flex flex-col justify-center items-start w-full md:w-big relative mb-5 rounded-lg bg-white px-6 py-3">
           
            <div v-show="!quizCompleted" class="w-full">
                <h2 class="text-slate-400 text-xl text-center w-full font-medium"><span class="relative font-bold text-xl ml-1">{{ this.questionPosition }}</span> Вопрос </h2>
                <span class="block w-full min-h-1 mt-2 bg-slate-300 overflow-x-hidden rounded-full">
                        <span class="relative block bg-rhino-500 h-1" :style="dividerWidth"></span>
                </span>
                <h2 v-html="loading ? 'Loading' : currentQuestion.question" class="text-2xl my-4 text-center w-full font-medium"></h2>
                <!-- <form class="flex flex-col gap-1 mt-3 items-start ">
                        <input type="submit" v-for="(answer, index) in currentQuestion.answers" :index="index" :key="index" class="shadow-md bg-cyan-500 text-slate-50 hover:bg-cyan-300 py-3 text-medium duration-75 w-full rounded-xl text-lg" :value="answer" @click.prevent="checkAnswer">
                    </form> -->
                <ul class="flex flex-col gap-2 items-center p-2">
                    <li class="divide-2 flex cursor-pointer items-center gap-4 divide-rhino-400 rounded-md border-b-2 border-b-rhino-500 bg-rhino-50 px-4 py-2 leading-6 text-rhino-900 transition hover:scale-105 transform duration-300  hover:shadow-xl w-full justify-between" v-for="(answer,index) in currentQuestion.answers" :key="index">
                        <!-- <RadioButton class="p-radiobutton flex item-center justify-center mx-2" :id="index" name="right_answer" :value="answer" v-model="questions[questionPosition].right_answer" /> -->
                        <input type="radio" class="radio" name="right_answer" :id="index" :value="answer" v-model="questions[questionPosition].right_answer">
                        <label type="text" :for="index" class="border-none cursor-pointer w-full px-4 py-2 resize-y leading-5 bg-transparent">{{answer}}</label>
                    </li>
                </ul>
            </div>
            <div class="mt-4 grid grid-cols-2 items-center gap-3 w-full" v-show="!quizCompleted">
                <button class="btn-secondary animate-scale-up-center" @click="questionPosition--" :disabled="questionPosition == 0">Назад</button>
                <button class="btn-primary  justify-center group relative inline-flex animate-scale-up-center items-center gap-x-2" @click="nextQuestion">
                    <span class="absolute right-0 translate-x-full transition-transform group-hover:-translate-x-4">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>
                    <span class="transition-all group-hover:mr-4"> Дальше </span>
                </button>
            </div>


            <div v-show="quizCompleted" class="flex flex-col gap-1 mt-3 items-center justify-center w-full">
                <p>Правильно выбранно ответ {{this.quizResult.correct }} из {{ questions.length }}</p>
                <button @click="updateQuiz()" class="block w-full">Заново</button>
            </div>
        </div>
        <!-- {{ this.questions[this.questionPosition].correct_answer}} -->
    </div>
</template>
<style scoped>

</style>
<script>
    export default {
        name: "QuizSolve",
        data() {
            return {
                questions: [],
                quizResult: {
                    correct: 0,
                    incorrect: 0
                },
           
                loading: true,
                questionPosition: 0,
                finish: false,
                // quizId: 0,
                error: false,
            }
        },
        created() {},
        methods: {
            async fetchQuiz() {
                this.loading = true
                let result = await this.$store.getters.getQuizFromDB(this.$route.params.quizId)
                this.currentQuestion = result.quizData
                this.loading = false;
            },
            async nextQuestion() {
                let question = this.questions[this.questionPosition]
                if (question.right_answer == undefined) return;
                console.log(question.right_answer) 
                if (question.correct_answer !== "" && this.questionPosition <= this.questions.length - 1) {
                    if (question.right_answer === question.correct_answer) {
                        this.questions[this.questionPosition].rightAnswer = true
                        this.quizResult.correct++
                    } else {
                        this.questions[this.questionPosition].rightAnswer = false
                        this.quizResult.incorrect++
                    }
                }                    
                if (this.questionPosition === this.questions.length - 1) {
                    this.finish = true
                }
                this.questionPosition++    
                
            },
            
            updateQuiz() {
                this.finish = false
                this.quizResult.incorrect = 0
                this.quizResult.correct = 0
                this.questionPosition = 0
                // this.loading = true
                this.currentQuestion = []
                this.fetchQuiz()
            }
        },
        computed: {
            dividerWidth() {
                let width = Math.floor((this.questionPosition * 100) / (this.questions.length - 1))
                console.log(width)
                return {
                    'width': width + '%',
                }
            },
            currentQuestion: {
                get() {
                    if (this.questions !== [] && this.questionPosition <= this.questions.length - 1) {
                        return this.questions[this.questionPosition]
                    }
                    return {
                        question: ""
                    }
                },
                set(data) {
                    this.questions = data
                }
            },
            quizCompleted() {
                if (this.finish == true) {
                    return true
                } else {
                    return false
                }
            }
        },
        mounted() {
            this.fetchQuiz()
            console.log(this.currentQuestion)
        }
    }
</script>
