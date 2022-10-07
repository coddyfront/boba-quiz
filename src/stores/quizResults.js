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
    // async getResults() {
    //     this.resetQuiz()
    //     const quizSolved = useSolveQuizStore()
    //     this.username = quizSolved.username
    //     await quizSolved.quiz.forEach(async(item) =>{
    //         console.log(item)
    //         if (item.typeOfQuestion === 'radio') {
    //             if (item.user_answer == item.right_answer) {
    //                 this.correctAnswers++
    //                 console.log(true)
    //                 return
    //             }else {
    //                 console.log(false)
    //                 this.uncorrectAnswers++
    //                 return
    //             }
    //         }
    //         if (item.typeOfQuestion === 'multiple') {
    //             if (item.user_answers.length != item.right_answers.length) {this.uncorrectAnswers++; return;}
    //             for (let i = 0; i <= item.user_answers.length-1; i++) {
    //               if(!item.right_answers.includes(item.user_answers[i])) {
    //                 console.log(1)
    //                 this.uncorrectAnswers++
    //                 return 
    //               }
    //               console.log(112313)
    //               this.correctAnswers++
    //               return
    //             }
    //         }
    //     })
    //     // quiz.quiz.forEach((item) => {
    //     //     console.log(item)
    //     // })
    //   },
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