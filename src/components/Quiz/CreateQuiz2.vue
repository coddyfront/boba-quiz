
<template>
    <div class="quiz flex items-center justify-center relative">
      <!-- stepper -->
      <div class="flex flex-col justify-center items-start w-full md:w-big relative mb-5 mx-2 lg:mx-0 rounded-lg bg-white px-4 py-2 border-2 border-stone-100 sm:px-6 sm:py-3 shadow-lg ">
        <!-- item (one quiz) -->
        <QuizCreateNumber :number="questionNumber" />
        <div class="flex flex-col w-full h-fit">
          <Fieldset legend="Тип вопроса" class="w-full my-4" :toggleable="true" >
            <div class="flex w-full gap-4">
              <div class="flex relative">
              <input type="radio" :value="`radio`" name="radio" id="radio" class="radio w-3 h-3 absolute top-[13.5px] left-[13.5px]" v-model="quiz[this.questionNumber].typeOfQuestion" />
              <label for="radio" class="h-fit w-fit">
                <img src="/questionTypeRadio.png" class="w-24 h-24 ring-4 ring-rhino-500 p-2 rounded-md block" />
              </label>
            </div>
            <div class="flex relative">
              <input type="radio" :value="`multiple`" name="multiple" id="multiple" class="radio w-3 h-3 absolute top-[13.5px] left-[13.5px] rounded-none" v-model="quiz[this.questionNumber].typeOfQuestion" />
              <label for="multiple" class="h-fit w-fit">
                <img src="/questionTypeRadio.png" class="w-24 h-24 ring-4 ring-rhino-500 p-2 rounded-md block" />
              </label>
            </div>
            </div>
          </Fieldset>


          <hr class="mb-8 h-1 w-full rounded-full bg-slate-200">
          <div class="card flex items-center flex-col mt-0">
            <Divider align="center">
              <span class="p-tag">Вопрос</span>
            </Divider>
            <input type="text" class="input my-4 md:w-3/4" placeholder="Вопрос ?)" v-model="quiz[this.questionNumber].question">

            <Divider align="center">
              <span class="p-tag">Ответы</span>
            </Divider>
            <!-- <input type="text" class="input my-4 md:w-3/4" placeholder="Вопрос ?)" v-model="quiz[questionNumber].question"> -->
            <!-- Answers -->
            <ul class="flex flex-col items-center gap-y-2 w-full mt-4">
               <QuizListAnswers  :typeOfQuestion="quiz[this.questionNumber].typeOfQuestion"/>
              <li class="w-full md:w-3/4 flex justify-center items-center mt-2 mb-4">
                <QuizCreateNewAnswerVue :questionNumber="questionNumber" />
              </li>
            </ul>
            <span class="flex justify-center w-full">
            <div class="btn-group mt-4 justify-items-stretch">
                <button class="btn-in-group animate-scale-up-center" @click="minusQuestionNumber" :disabled="this.questionNumber == 0">Назад</button>
                <button class="btn-in-group animate-scale-up-center"  @click="createNewQuiz" id="createNewQuiz">Создать Quiz</button>   
                <button class="btn-in-group animate-scale-up-center" @click="createNewQuestion">Далее</button>
              </div>
            </span>
          </div>
        </div>

      </div>
    </div>
    <Teleport to="body">
        <Modal @close="closeModal" v-show="isModalVisible">
          <template #body>
            <p>Спасибо, что пользуйтесь Boba Quiz! </p>
            <div class="flex gap-2 items-center ">
              <RouterLink :to="{name:'solveView', params: {quizId: `${this.$route.params.quizId}`}, query: {username: `anonymous`}}">
                <button class="btn-secondary divide-x-2 divide-rhino-500 flex flex-row  justify-between items-center gap-2 " >
                  <span>Перейти к выполенею</span>
                </button>  
              </RouterLink>
              <button class="relative rounded-md bg-rhino-100 py-2.5 px-3 group hover:bg-rhino-200 focus:ring-2 focus:ring-rhino-400 transition ease-out" @click="copyQuizUrlToClipBoard">
                <svg  class="w-6 h-6  stroke-rhino-700 transition ease-out  group-hover:stroke-rhino-800  " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
                <SimpleTooltipVue :message="`Скопировано`" class="group-active:flex" />
              </button>
            </div>
          </template>
        </Modal>
      </Teleport>
  </template>
  
  
  <script>
    import QuizListAnswers from '../QuizCreate/QuizListAnswers.vue'
    import {
      nextTick
    } from 'vue';
    import { RouterLink } from 'vue-router';
    import QuizCreateNumber from '../QuizCreate/QuizCreateNumber.vue'
    import QuizCreateNewAnswerVue from '../QuizCreate/QuizCreateNewAnswer.vue';
    import {toastError} from '../../../services/toast.js'
    import { useCreateQuizStore } from '@/stores/quiz';
    import {mapState,mapActions} from 'pinia';
  import Modal from '@/components/Library/Modal.vue';
    import SimpleTooltipVue from '@/components/Library/SimpleTooltip.vue';
    export default {
      data() {
        return {
          selectedCategory: '',
          isModalVisible: false,

        }
      },
      computed: {
        ...mapState(useCreateQuizStore, ['quiz','questionNumber', 'quizId']),
      },
      components: {
       QuizCreateNumber,QuizListAnswers,Modal,QuizCreateNewAnswerVue,SimpleTooltipVue
      },
      methods: {
        // ...mapActions(useCreateQuizStore, ['']),
        ...mapActions(useCreateQuizStore, ['plusQuestionNumber','minusQuestionNumber','setQuizId','createQuiz', 'resetQuiz']),
        async createNewQuiz() {
          let error = false
          // console.log(this.quiz)
          // console.log(error)
          if (error == false) {
            console.log('create')
            await this.createQuiz().then(async (result) => {
              console.log(result) 
              if (result == true) {
                this.showModal()
                await this.resetQuiz()
              } else {
                return this.toastError('Прозошла какая-то ошибка :<')
              }
            })
           
          }
        },
        async createNewQuestion() {
          if (this.quiz[this.questionNumber].question !== "") {
            if (this.quiz[this.questionNumber].user_answer !== "" || this.quiz[this.questionNumber].user_answers.length !==0) {
              if(this.questionNumber === this.quiz.length - 1) {
                this.quiz.push({
                  question: "",
                  answers: [],
                  user_answer: "",
                  right_answer: "",
                  right_answers: new Array(),
                  user_answers: new Array(),
                  typeOfQuestion: "radio",
                })
              }
              await nextTick()
              this.plusQuestionNumber()
            } else {
              return this.toastError('Выбирете правильный ответ на вопрос!')
            }
          } else {
            return this.toastError('Вопрос не может быть пустым!')
          }
        },
        showModal() {
        this.isModalVisible = true;
        },
        closeModal() {
          this.isModalVisible = false;
        },
        async copyQuizUrlToClipBoard(){
          let url = this.$route.fullPath
          const absoluteURL = new URL(url, window.location.origin).href;
          // console.log( absoluteURL)
          await navigator.clipboard.writeText(absoluteURL);
        },
      },
      mounted() {
        this.toastError = toastError
        this.setQuizId(this.$route.params.quizId)
      },
      
    }
  </script>
  <style>
    .p-fieldset {
      border: none !important;
    }
    .p-fieldset-legend a {
      padding: 0.5rem 1rem !important;
    }
    .p-divider.p-divider-horizontal {
      margin: 0 0 !important;
    }
  
  
  </style>