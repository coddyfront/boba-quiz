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
        const result = {
          correctAnswers: 0,
          uncorrectAnswers: 0
        }
        await this.quiz.forEach(async(item) =>{
            console.log(item)
           
            if (item.typeOfQuestion === 'radio') {
                if (item.user_answer == item.right_answer) {
                    result.correctAnswers++
                    console.log(true)
                }else {
                    result.uncorrectAnswers++
                    console.log(false)

                }
            }
            else if (item.typeOfQuestion === 'multiple') {
                if (item.user_answers.includes(item.right_answers)) {
                  result.correctAnswers++
                }else {
                  result.uncorrectAnswers++
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