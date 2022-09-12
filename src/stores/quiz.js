import { defineStore } from 'pinia';
import {createQuizDB,  getQuiz } from '../../firebase';
// You can name the return value of `defineStore()` anything you want, but it's best to use the name of the store and surround it with `use` and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useCreateQuizStore = defineStore('quiz', {
  // other options...
  state: () =>  ({
    quiz: [
        {
        question: "What do you want to do?",
        typeOfQuestion: "radio",
        answers: [
            "Do not know",
            "Go away!",
            'Go to the next question',
            'sdk maskdmadkad adm am asd maskdm akd asd ad mamd asdm asd mad k ak'
        ],
        user_answer: 0,
        user_answers: new Array() || [],
        }
    ],
    quizId: "",
    questionNumber: 0,
  }),
  getters: {
    getQuizFromDB: () => async (quizId) => {
      let quiz = await getQuiz(quizId)
      return quiz
    }
  },
  actions: {
    plusQuestionNumber(){
      this.questionNumber++
    },
    minusQuestionNumber(){
      this.questionNumber--
    },
    setCorrectRadioAnswer(question_index, answer) {
        this.quiz[question_index].correct_answer = answer;
    },
    resetRadioAnswer(question_index){
      this.quiz[question_index].correct_answer = "";
    },
    setCorrectMultipleAnswers(question_index, answers) {
      this.quiz[question_index].correct_answers = []
        this.quiz[question_index].correct_answers = answers
    },
    setTypeOfQuestion(question_index, typeOfQuestion) {
        this.quiz[question_index].typeOfQuestion = typeOfQuestion
    },
    setQuizId(quizId) {
        this.quizId = quizId
    },
    resetQuiz(){
      this.$reset()
      console.log(1)
    },
    async createQuiz() {
      let result = null
      try {
        let quizAllReadyExists = await getQuiz(this.quizId)
        console.log(quizAllReadyExists)
        if (quizAllReadyExists === null) {
          result = await createQuizDB({quizId: this.quizId, quizData: this.quiz})
          console.log("Quiz successfully created")
          result = true
          return result
        }
        else {
          result = false
          console.log("Quiz with mentioned ID already exists")
          return result
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
})