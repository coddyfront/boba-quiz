import { defineStore } from 'pinia';
// import {createQuizDB,  getQuiz } from '../../firebase';
import { reactive } from 'vue'
import useQuiz from "@/composables/useQuiz";
// You can name the return value of `defineStore()` anything you want, but it's best to use the name of the store and surround it with `use` and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useCreateQuizStore = defineStore('quiz', {
  // other options...
  state: () =>  ({
    quiz: [
        {
        question: "",
        typeOfQuestion: "radio",
        answers: [
            
        ],
        user_answer: "",
        user_answers: new Array() || [],
        right_answer: "",
        right_answers: new Array() || [],
        }
    ],
    quizId: "",
    questionNumber: 0,
  }),
  getters: {
    // getQuizFromDB: () => async (quizId) => {
    //   let quiz = await getQuiz(quizId)
    //   return quiz
    // }
  },
  actions: {
    plusQuestionNumber(){
      this.questionNumber++
    },
    minusQuestionNumber(){
      this.questionNumber--
    },
    deleteQuestion(){
      if (this.questionNumber != 0) {
      this.quiz.pop(this.questionNumber)
      this.questionNumber--
    }
    },
    deleteLastQuestion(){
      if (this.quiz.length != 0) {
      this.quiz.pop()
      this.questionNumber--
      }
    },
    setTypeOfQuestion(question_index, typeOfQuestion) {
        this.quiz[question_index].typeOfQuestion = typeOfQuestion
    },
    setQuizId(quizId) {
        this.quizId = quizId
    },
    resetQuiz(){
      this.$reset()
    },
    generateUUID() {
      let
        d = new Date().getTime(),
        d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = Math.random() * 16;
        if (d > 0) {
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
      });
    },
    async createQuiz() {
      const {insertQuiz} = useQuiz();
      try {
        let {data, error} = await insertQuiz(this.quiz, this.quizId)
        console.log(error)
        console.log("Quiz successfully created")
        return error
      } catch (e) {
        console.log(e)
        return false
      }
      // try {
      //   let quizAllReadyExists = await getQuiz(this.quizId)
      //   console.log(quizAllReadyExists)
      //   if (quizAllReadyExists === null) {
      //     result = await createQuizDB({quizId: this.quizId, quizData: this.quiz})
      //     console.log("Quiz successfully created")
      //     result = true
      //     return result
      //   }
      //   else {
      //     result = false
      //     console.log("Quiz with mentioned ID already exists")
      //     return result
      //   }
      // } catch (error) {
      //   console.log(error)
      // }
    }
  }
})