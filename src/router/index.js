import { createRouter, createWebHistory } from 'vue-router'
import {getQuiz} from '../../firebase'
import CreateQuizView from '../views/CreateQuizView.vue'
import CreateQuiz2View from '../views/CreateQuiz2View.vue'
import {storeToRefs} from 'pinia'
import { useSolveQuizStore } from '@/stores/quizSolve';
import { useCreateQuizStore } from '../stores/quiz'
import { useResultsQuizStore } from '../stores/quizResults';
import CompleteQuizView from '../views/CompleteQuizView.vue';
import ResultsQuiz from '../components/Quiz/ResultsQuiz.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=> import ('../views/HomeView.vue'),
      beforeEnter: async (to, from, next) => {
        const solveStore = useSolveQuizStore();
        const createStore = useCreateQuizStore()
        const resultsStore = useResultsQuizStore()
        solveStore.$reset()
        createStore.$reset()
        resultsStore.$reset()
        next()
      }
    },
    {
      path: '/create2/',
      name: 'create2',
      beforeEnter: async (to, from, next) => {
        if (from.name !== 'home') next({name: 'home'})
        else {
          let id = generatePassword()
          next({name: 'createQuiz2', params: {quizId: id}})
        }
      },
    },
    {
      path: '/create2/:quizId(.*)',
      name: 'createQuiz2',
      component: CreateQuiz2View
        // next()
    },
    {
      name: 'quizResults',
      path: '/results/:quizId(.*)',
      component: ResultsQuiz,
      beforeEnter: async (to, from, next) => {
        if (to.query.username === '' || to.query.username===undefined) {
          next({name: 'home'})
        } else {
          next()
        }
      }
    },
    {
      path: '/create/',
      name: 'create',
      beforeEnter: async (to, from, next) => {
        if (from.name !== 'home') next({name: 'home'})
        else {
          let id = generatePassword()
          next({name: 'createQuiz', params: {quizId: id}})
        }
      },
    },
    {
      path: '/create/:quizId(.*)',
      name: 'createQuiz',
      component: CreateQuizView
        // next()
    },
    {
      path: '/complete',
      name: 'chooseQuiz',
      component: ()=> import('../views/ChooseQuizView.vue'),
    },
    {
      path: '/solve',
      name: 'solve',
      component: ()=> import('../views/ChooseQuizView2.vue')
    },
    {
      path: '/solve/:quizId',
      component: CompleteQuizView,
      name: 'solveView',
      beforeEnter: async (to, from, next) => {
        const store = useSolveQuizStore()
        
        console.log(store)
        let quizAddedToStore = await store.getQuizFromDB(to.params.quizId)
        if (!quizAddedToStore) {
            next({name: 'chooseQuiz', query: {error: '1'}})
            store.$reset()
        }else {
          // console.log(quizAddedToStore, to.query.username)
          store.username = to.query.username
          store.quizId = to.params.quizId
          next()
        }
      }
    },
    // {
    //   path: '/complete/:quizId',
    //   component: () => import('../views/CompleteQuizView.vue'),
    //   name: 'completeQuiz',
    //   beforeEnter: async (to, from, next) => {
    //     // if (from.name !== 'chooseQuiz') {
    //     //   next({name: 'chooseQuiz'})
    //     // }
    //     // else {
          
    //       let quizAllReadyExists = await getQuiz(to.params.quizId)
    //       if (quizAllReadyExists === null) {
    //         next({name: 'chooseQuiz', query: {error: '1'}})
    //       }
    //       next()
    //     // }
    //   },
    // }
    

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})
function generatePassword() {
  var length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}
export default router
