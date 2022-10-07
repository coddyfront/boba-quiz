import { defineStore } from 'pinia';
// import { getQuiz } from '../../firebase';
import useQuiz from '@/composables/useQuiz';

export const useSolveQuizStore = defineStore('quizSolve', {
    // other options...
    state: () =>  ({
      quiz: [],
      quizId: "",
      questionNumber: 0,
      username: "hello"
    }),
    actions: {
      async getQuizFromDB(quizID) {
        const {getQuizById} = useQuiz()
        const {data} = await getQuizById(quizID)
        console.log(data)
        if (data === null) {
          return false
        } else {
        
          this.quiz = JSON.parse(data[0].data)
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
      async getResults() {
        let result = {
          correctAnswers: 0,
          uncorrectAnswers: 0
        }
        await this.quiz.forEach(async(item) =>{
            console.log(item)
            if (item.typeOfQuestion === 'radio') {
                if (item.user_answer == item.right_answer) {
                  result.correctAnswers++
                    console.log(true)
                    return
                }else {
                    console.log(false)
                    result.uncorrectAnswers++
                    return
                }
            }
            if (item.typeOfQuestion === 'multiple') {
                if (item.user_answers.length != item.right_answers.length) {this.uncorrectAnswers++; return;}
                for (let i = 0; i <= item.user_answers.length-1; i++) {
                  if(!item.right_answers.includes(item.user_answers[i])) {
                    console.log(1)
                    result.uncorrectAnswers++
                    return 
                  }
                  console.log(112313)
                  result.correctAnswers++
                  return
                }
            }
        })
        return result
        // quiz.quiz.forEach((item) => {
        //     console.log(item)
        // })
      },
      async saveResults(){
      const results = await this.getResults()
      const {applyResults}=useQuiz()
      await applyResults(this.quizId, results)
      }
    }
  })