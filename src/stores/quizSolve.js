import { defineStore } from 'pinia';
import { getQuiz } from '../../firebase';

export const useSolveQuizStore = defineStore('quizSolve', {
    // other options...
    state: () =>  ({
      quiz: {},
      quizId: "",
      questionNumber: 0,
      username: "hello"
    }),
    actions: {
      async getQuizFromDB(quizID) {
        let quizFromDB = await getQuiz(quizID)
        if (quizFromDB === null) {
          return false
        } else {
          console.log(this.username)
          this.quiz = quizFromDB.quizData
          return true
        }
      },
      plusQuestionNumber(){
        this.questionNumber++
      },
      minusQuestionNumber(){
        this.questionNumber--
      },
      setCorrectRadioAnswer(question_index, answer) {
          this.quiz[question_index].right_answer = answer;
      },
      resetQuiz(){
        this.$reset()
      },
    }
  })