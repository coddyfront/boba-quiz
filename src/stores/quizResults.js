import { defineStore } from 'pinia';
import { useSolveQuizStore } from './quizSolve';

export const useResultsQuizStore = defineStore('quizResults', {
    // other options...
    state: () =>  ({
      quiz: [],
      quizId: "",
      username: "",
      correctAnswers: 0,
      uncorrectAnswers: 0,
    }),
    actions: {
    async getResults() {
        const quiz = useSolveQuizStore()
        this.username = quiz.username
        
        await quiz.quiz.forEach(async(item) =>{
            console.log(item)
            if (item.typeOfQuestion === 'radio') {
                if (item.user_answer == item.right_answer) {
                    await this.correctAnswers++
                    console.log(true)
                }else {
                    await this.uncorrectAnswers++
                    console.log(false)

                }
            }
            if (item.typeOfQuestion === 'multiple') {
                if (item.user_answers.includes(item.right_answers)) {
                    await this.correctAnswers++
                }else {
                    await this.uncorrectAnswers++
                }
            }
        })
        // quiz.quiz.forEach((item) => {
        //     console.log(item)
        // })
      },
      resetQuiz(){
        this.$reset()
      },
    }
  })