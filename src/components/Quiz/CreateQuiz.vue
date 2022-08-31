
<template>
  <div class="quiz flex items-center justify-center">
    <!-- stepper -->
      <div class="flex flex-col justify-center items-start w-full md:w-big relative mb-5 rounded-lg bg-white px-6 py-3 shadow-lg ">
        <!-- item (one quiz) -->
        <h2 class="text-xl font-medium"><span class="relative font-bold font-mono text-2xl ml-1">{{ this.current_question.position }}</span> Вопрос </h2>
        <div class="flex flex-col w-full h-fit">
          <Fieldset legend="Тип вопроса" class="w-full my-4 " :toggleable="true">
              <img  src="/questionTypeRadio.png" class="w-24 h-24 ring-4 ring-rhino-500 p-2 rounded-md">
              
          </Fieldset>
          <hr class="mb-8 h-1 w-full rounded-full bg-slate-200">

          <div class="card flex items-center flex-col mt-0">
              <Divider align="center">
                  <span class="p-tag">Вопрос</span>
              </Divider>
              <input type="text" class="input my-4 md:w-3/4" placeholder="Вопрос ?)" v-model="quiz[current_question.position].question">
              <Divider align="center">
                  <span class="p-tag">Ответы</span>
              </Divider>
              <!-- Answers -->
              <ul class="flex flex-col items-center gap-y-2 w-full mt-4">
                <li class="w-full md:w-3/4 flex py-2 px-4 gap-2 justify-between items-center bg-rhino-50/50 rounded-md" v-for="(answer,index) in quiz[current_question.position].answers" :key="index" >
                    <!-- <input type="radio" :value="answer" v-model="quiz[current_question.position].correct_answer"  :id="index" name="correct_answer" class="radio" />
                    <textarea type="text" v-model="quiz[current_question.position].answers[index]" class="w-full px-4 py-2 resize-y leading-6 bg-transparent rounded-none outline-none border-none focus:ring-0" rows="1" @input="resizeTextArea($event, index)" @focus="resizeTextArea($event, index)"></textarea> -->
                    <input type="radio" :value="answer" v-model="quiz[current_question.position].correct_answer"  :id="index" name="correct_answer" class="radio" @change="changeCorrectQuestionId(index)"/>
                    <textarea type="text" v-model="quiz[current_question.position].answers[index]" class="w-full px-4 py-2 resize-y leading-6 bg-transparent rounded-none outline-none border-none focus:ring-0" rows="1" @input="resizeTextArea($event, index)" @focus="resizeTextArea($event, index)"></textarea>
                    <div @click="deleteQuestion(index)">
                    <button class="h-max flex item-center justify-center" >
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                    </button>
                  </div>
                
                </li>
                <li class="w-full md:w-3/4 flex justify-center items-center mt-2 mb-4">
                  <input type="text" @focus="newAnswerFocused = true"  @blur="newAnswerFocused = false" v-model="newAnswer" @keyup.enter="e=> e.target.blur()" class="input w-full" placeholder="Введите новый ответ">
                </li>
              </ul>
              <span class="flex justify-center w-full">
                <div class="btn-group mt-4 justify-items-stretch">
                  <button class="btn-in-group animate-scale-up-center" @click="current_question.position--" :disabled="current_question.position == 0">Назад</button>
                  <button class="btn-in-group animate-scale-up-center"  @click="createQuiz">Создать Quiz</button>   
                  <button class="btn-in-group animate-scale-up-center" @click="createNewQuestion">Далее</button>
                </div>
              </span>
          </div>
        </div>
        <!-- {{quiz[current_question.position].correct_answer}} -->
      </div>
      <Modal @close="closeModal" v-show="isModalVisible"></Modal>
  </div>
</template>


<script >
import { nextTick } from 'vue';
import { createToast } from 'mosha-vue-toastify';
// import the styling for the toast
import 'mosha-vue-toastify/dist/style.css';
import Modal from '@/components/Library/Modal.vue'

export default {
  data(){
    return {
      selectedCategory:'',
      newAnswer: "",
      isModalVisible: false,
      newAnswerFocused: true,
      current_question: {
        position: 0,
        correct_question_id: ""
        },
      quiz: [
        {
          question: "What do you want to do?",
          answers: [
            "Do not know",
            "I know, but i wouldn't say ypu tah little small motherfucker ahahahah",
            'Correct'
          ],
          correct_answer: ""
        },
       
      ]
    }
  },
  components: {
    Modal
  },
  setup(){
    // import radioType from '@/assets/questionTypeRadio.png';

    const toastError = (descriptionError) => {
          createToast({
            title: 'Ошибка',
            description: descriptionError,
            },
            {
            position: 'top-right',
            type: 'danger',
            transition: 'bounce',
            showIcon: 'true',
            timeout: 3000,
            })
          }
          return { toastError }
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    changeCorrectQuestionId(index){
      console.log('change', index)
      this.current_question.correct_question_id = index
    },
    resizeTextArea(e, index) {
      const elem = e.target;
      elem.style.height = elem.scrollHeight  + "px";
      console.log(index)
      if(index == this.current_question.correct_question_id) {
        this.quiz[this.current_question.position].correct_answer = e.target.value
      }

    },
    async createQuiz(){
        let error = false
        for(let item of this.quiz) {
          // Error handle
          if (item.correct_answer == "" || item.question === "" ) {
            return this.toastError('Вы не заполнили вопрос полностью!')
          }
        }
        console.log(this.quiz)
        console.log(error)
        if (error == false) {
          this.$store.dispatch('createQuiz', {
            quizId: this.$route.params.quizId,
            quizData: this.quiz
          }).then(result => {
            console.log(result)
            if (result == true) {
              // document.body.setAttribute('disabled', "")

              this.showModal()
            }else {
              return this.toastError('Прозошла какая-то ошибка :<')
            }
          })
          // console.log(result)
        }
    },
    async createNewQuestion() {
      if (this.quiz[this.current_question.position].question !== "") {
        if (this.quiz[this.current_question.position].correct_answer !== "") {
          if (this.current_question.position === this.quiz.length - 1) {
            console.log(1)
            this.quiz.push({
            question: "",
            answers: [],
            correct_answer: "",
            right_answer: 0,
            })
            await nextTick()
        
            this.current_question.position++
          }else {
            this.current_question.position++
          }
        } else {
          return this.toastError('Выбирете правильный ответ на вопрос!')
        }
      } else {
        return this.toastError('Вопрос не может быть пустым!')
      }
    },
     deleteQuestion(index) {
        console.log(index)
        this.quiz[this.current_question.position].answers.splice(index,1)
      }
  },
  updated(){
    document.body.querySelectorAll('textarea').forEach(item => {
      item.style.height = item.scrollHeight  + "px";
    })
  },
  mounted(){
    document.body.querySelectorAll('textarea').forEach(item => {
      item.style.height = item.scrollHeight  + "px";
    })
  },
  watch: {
    newAnswerFocused(newData, oldData) {
      console.log(newData)
      if (newData === false && this.newAnswer !== "") {
        this.quiz[this.current_question.position].answers.push(this.newAnswer.trim())
        this.newAnswer = ""
        // console.log(this.quiz[this.current_question.position].answers)
      } else if (this.newAnswer === "" && newData === false){
          return this.toastError('Ответ не может быть пустым!')
      }
    }
  }
}
</script>
<style >
  .p-fieldset {
    border: none !important;
    
  }
  .p-fieldset-legend a {
    padding: 0.5rem 1rem !important;
  }
  .p-divider.p-divider-horizontal {
    margin: 0 0 !important;
  }
  .p-radiobutton {
    width: 2rem !important;
    height: 1.8rem !important;
  }
  .p-radiobutton-box {
    width: 100% !important;
    height: 100% !important;
    padding: 2px !important;
  }
  .p-radiobutton-icon {
    width: 0.5rem !important;
    height: 0.5rem !important;
  }
  </style>