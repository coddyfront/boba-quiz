import { createApp } from 'vue'
import { createStore} from 'vuex'
// Import the functions you need from the SDKs you need
import {createQuiz,  getQuiz } from '../../firebase'

const store = createStore({
    state () {
      return {
        count: 0
      }
    },
    mutations: {
        SAVE_QUIZ_DB(state, payload) {
            
      }
    },
    actions: {
        async createQuiz(context, payload) {
          // console.log(payload)
          let result = null
          try {
            let quizAllReadyExists = await getQuiz(payload.quizId)
            if (quizAllReadyExists === null) {
              result = await createQuiz({quizId: payload.quizId, quizData: payload.quizData})
              console.log("Quiz successfully created")
            }
            else {
              console.log("Quiz with mentioned ID already exists")
            // let result = await getQuiz('9QiyqZuu')
            }
          } catch (error) {
            console.log(error)
          }
            // context.commit('SAVE_QUIZ_DB', payload)
        }
    },
    getters: {
      getQuizFromDB : (state) => async (quizId) => {
        let quiz = await getQuiz(quizId)
        return quiz
      }
    }
  })
  export default store