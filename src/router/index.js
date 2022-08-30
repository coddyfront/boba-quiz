import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateQuizView from '../views/CreateQuizView.vue';
import ChooseQuizView from '../views/ChooseQuizView.vue';
import CompleteQuizView from '../views/CompleteQuizView.vue';
import {getQuiz} from '../../firebase'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create',
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
      path: '/create/:quizId',
      name: 'createQuiz',
      component: CreateQuizView
        // next()
    },
    {
      path: '/complete',
      name: 'chooseQuiz',
      component: ChooseQuizView,
    },
    {
      path: '/complete/:quizId',
      component: () => import('../views/CompleteQuizView.vue'),
      name: 'completeQuiz',
      beforeEnter: async (to, from, next) => {
        // if (from.name !== 'chooseQuiz') {
        //   next({name: 'chooseQuiz'})
        // }
        // else {
          
          let quizAllReadyExists = await getQuiz(to.params.quizId)
          if (quizAllReadyExists === null) {
            next({name: 'chooseQuiz', query: {error: '1'}})
          }
          next()
        // }
      },
    }
    

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
