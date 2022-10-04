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
                  console.log(1111111111)
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
      async setResults(data){
        // const results = JSON.parse(data[0].data)
        await this.resetQuiz()
        // console.log(JSON.parse(data[0].results).results)
        const parsedData = await JSON.parse(data[0].results)
        this.correctAnswers = parsedData.results.correctAnswers
        this.uncorrectAnswers = parsedData.results.uncorrectAnswers
      },
      resetQuiz(){
        this.$reset()
      },
    }
  })