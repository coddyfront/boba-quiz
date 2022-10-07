
<template>
  <div class="quiz flex items-center justify-center relative mx-2 lg:mx-0">
    <!-- stepper -->
    <div class="flex flex-col justify-center items-start md:w-big relative  rounded-xl bg-white p-2 sm:px-6 sm:py-3 ring-2 ring-rhino-300 ring-inset">
      <!-- item (one quiz) -->
      <div class="inline-flex items-center justify-between w-full">
        <!-- <QuizCreateNumber :number="questionNumber" /> -->
        <button class="btn-secondary" v-on:click="settingsIsVisible=!settingsIsVisible">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
      <path fill-rule="evenodd" d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" clip-rule="evenodd" />
      <path d="M10.076 8.64l-2.201-2.2V4.874a.75.75 0 00-.364-.643l-3.75-2.25a.75.75 0 00-.916.113l-.75.75a.75.75 0 00-.113.916l2.25 3.75a.75.75 0 00.643.364h1.564l2.062 2.062 1.575-1.297z" />
      <path fill-rule="evenodd" d="M12.556 17.329l4.183 4.182a3.375 3.375 0 004.773-4.773l-3.306-3.305a6.803 6.803 0 01-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 00-.167.063l-3.086 3.748zm3.414-1.36a.75.75 0 011.06 0l1.875 1.876a.75.75 0 11-1.06 1.06L15.97 17.03a.75.75 0 010-1.06z" clip-rule="evenodd" />
                    </svg>
                </button>
        <Popup placement="bottom" content="Опубликовать Boba Quiz без последнего вопроса?" v-on:yes="createNewQuiz" click>
              <button class="btn-primary items-center  inline-flex gap-1"  id="createNewQuiz">
            <!-- <button class="btn-primary items-center  inline-flex gap-1"  id="createNewQuiz"> -->
                  Опубликовать
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                  <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
                </svg>
            </button>
        </Popup>
      </div>
      <div class="flex flex-col w-full h-fit">
        <Transition name="fade" :duration="{ enter: 500, leave: 300 }">
          <div v-if="settingsIsVisible" class="w-full flex flex-col gap-4 mt-4">
            <div class="w-full flex gap-4 mt-4">
              <div :class="['flex relative ring-4 rounded-md ', quiz[this.questionNumber].typeOfQuestion === 'radio' ? 'ring-rhino-500' : 'ring-rhino-100']">
                <input type="radio" :value="`radio`" name="radio" id="radio" class="hidden" v-model="quiz[this.questionNumber].typeOfQuestion" />
                <label for="radio" class="h-fit w-fit">
                        <img src="/radio.svg" class="w-24 h-24    block" />
                        </label>
              </div>
              <div :class="['flex relative ring-4 rounded-md ', quiz[this.questionNumber].typeOfQuestion === 'multiple' ? 'ring-rhino-500' : 'ring-rhino-100']">
                <input type="radio" :value="`multiple`" name="multiple" id="multiple" class="hidden" v-model="quiz[this.questionNumber].typeOfQuestion" />
                <label for="multiple" class="h-fit w-fit">
                        <img src="/multiple.svg" class="w-24 h-24  block" />
                        </label>
              </div>
            </div>
            <button class="btn-primary w-fit" @click="deleteQuestion">Удалить вопрос</button>
          </div>
        </Transition>
        <div class="card flex items-center flex-col mt-4">
          <Divider align="center">
            <span class="p-tag">Вопрос {{this.questionNumber}}</span>
          </Divider>
          <input type="text" class="input my-4 md:w-10/12" placeholder="Вопрос ?)" v-model="quiz[this.questionNumber].question">
          <Divider align="center">
            <span class="p-tag">Ответы</span>
          </Divider>
          <!-- <input type="text" class="input my-4 md:w-3/4" placeholder="Вопрос ?)" v-model="quiz[questionNumber].question"> -->
          <!-- Answers -->
          <ul class="flex flex-col items-center gap-y-3 w-full mt-4" ref="parent">
            <QuizListAnswers :typeOfQuestion="quiz[this.questionNumber].typeOfQuestion" />
            <li class="w-full flex justify-center items-center mt-2 mb-4">
              <QuizCreateNewAnswerVue :questionNumber="questionNumber" />
            </li>
          </ul>
          <div class="btn-group mb-2 justify-items-stretch md:w-10/12 w-full ">
            <button class="btn-in-group animate-scale-up-center w-full" @click="minusQuestionNumber" :disabled="this.questionNumber == 0">Предыдущий вопрос</button>
            <button class="btn-in-group animate-scale-up-center w-full" @click="createNewQuestion">Следующий вопрос</button>
          </div>
        </div>
      </div>
    </div>
  </div>
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
            </button>
          </div>
      </template>
    </Modal>
</template>

<script>
  import QuizListAnswers from '@/components/QuizCreate/QuizListAnswers.vue'
  import Popup from '@/components/Library/Popup.vue'
  import {
    nextTick
  } from 'vue';
  import {
    RouterLink
  } from 'vue-router';
  import QuizCreateNumber from '@/components/QuizCreate/QuizCreateNumber.vue'
  import QuizCreateNewAnswerVue from '@/components/QuizCreate/QuizCreateNewAnswer.vue';
  import {
    toastError
  } from '../services/toast.js'
  import {
    useCreateQuizStore
  } from '@/stores/quiz';
  import {
    mapState,
    mapActions
  } from 'pinia';
  import {
    checkQuizToCreate
  } from '../services/checkQuizToCreate.js';
  import {
    useAutoAnimate
  } from '@formkit/auto-animate/vue'
  import Modal from '@/components/Library/Modal.vue';
  // import SimpleTooltipVue from '@/components/Library/SimpleTooltip.vue';
  export default {
    data() {
      return {
        selectedCategory: '',
        isModalVisible: false,
        settingsIsVisible: false,
      }
    },
    computed: {
      ...mapState(useCreateQuizStore, ['quiz', 'questionNumber', 'quizId']),
    },
    components: {
      QuizCreateNumber,
      QuizListAnswers,
      Modal,
      QuizCreateNewAnswerVue,
      Popup,
    },
    methods: {
      // ...mapActions(useCreateQuizStore, ['']),
      ...mapActions(useCreateQuizStore, ['plusQuestionNumber', 'minusQuestionNumber', 'deleteQuestion', 'deleteLastQuestion', 'setQuizId', 'createQuiz', 'resetQuiz']),
      async createNewQuiz() {
        // console.log(this.quiz)
        // console.log(error)
        let error = await checkQuizToCreate()
        console.log(error, 'error checkQuizToCreate')
        if (error == true) {
          return this.toastError('Прозошла какая-то ошибка, проверьте полнуту заполнения данных и попытайтесь создать Quiz снова :Ю')
        }else if(error =='create without last question' ){
          this.deleteLastQuestion()
        }
        await this.createQuiz().then(async(result) => {
          console.log(result)
          if (result === null) {
            this.showModal()
            await this.resetQuiz()
          }
          else {
            return this.toastError('Квиз с данным Id уже существует')
          }
        })
      },
      async createNewQuestion() {
        if (this.quiz[this.questionNumber].question !== "") {
          if (this.quiz[this.questionNumber].user_answer !== "" || this.quiz[this.questionNumber].user_answers.length !== 0) {
            if (this.questionNumber === this.quiz.length - 1) {
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
      async copyQuizUrlToClipBoard() {
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
    setup() {
      const [parent] = useAutoAnimate()
      return {
        parent
      }
    }
  }
</script>
<style>
  .p-divider.p-divider-horizontal {
    margin: 0 0 !important;
  }
  /* we will explain what these classes do next! */
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    transform: translateX(30px);
    opacity: 0;
  }
</style>