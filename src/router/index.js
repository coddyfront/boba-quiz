import { createRouter, createWebHistory } from 'vue-router'
import { useSolveQuizStore } from '@/stores/quizSolve';
import { useCreateQuizStore } from '../stores/quiz'
import { useResultsQuizStore } from '../stores/quizResults'
import useAuthUser from "@/composables/useAuthUser";
import useQuiz from "@/composables/useQuiz";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: ['/index', '/home', ],
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
      meta: {
        requiresAuth: true
      },
      beforeEnter: async (to, from, next) => {
        if (from.name !== 'home') next({name: 'home'})
        else {
          const store = useCreateQuizStore()
          let id = store.generateUUID()
          next({name: 'createQuiz2', params: {quizId: id}})
        }
      },
    },
    {
      path: '/create2/:quizId(.*)',
      name: 'createQuiz2',
      meta: {
        requiresAuth: true
      },
      component: ()=> import('../views/CreateQuiz2View.vue')
        // next()
    },
    {
      name: 'quizResults',
      path: '/results/:quizId(.*)/:username',
      meta: {
        requiresAuth: true
      },
      component: ()=> import('../components/Quiz/ResultsQuiz.vue'),
      beforeEnter: async (to, from, next) => {
        // if (to.query.username === '' || to.query.username===undefined) {
          const {getResults} = useQuiz()
          let {data, error} = await getResults(to.params.quizId)
          if (error === null) {
            const resultsStore = useResultsQuizStore()
            await resultsStore.setResults(data)
            next()

          }else {
            next({name: 'home'})
          }
      }
    },
    {
      path: '/complete',
      name: 'chooseQuiz',
      meta: {
        requiresAuth: true
      },
      component: ()=> import('../views/ChooseQuizView.vue'),
    },
    {
      path: '/solve',
      name: 'solve',
      meta: {
        requiresAuth: true
      },
      component: ()=> import('../views/ChooseQuizView2.vue')
    },
    {
      path: '/solve/:quizId',
      meta: {
        requiresAuth: true
      },
      component: ()=> import('../views/CompleteQuizView.vue'),
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
          // store.username = to.query.username
          store.quizId = to.params.quizId
          next()
        }
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue'),
      children: [
        {
          path: '',
          redirect: {name: 'login'}
        },
        { 
          path:'login', name: 'login', component: ()=> import('@/views/LoginView.vue')
        },
        {
          path:'register', name: 'register', component: ()=> import('@/views/RegisterView.vue')
        },

      ],
    },
     {
        name: "logout",
        path: "/logout",
        beforeEnter: async () => {
          const { logout } = useAuthUser();
          await logout();
          return { name: "home" };
        },
      }
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

router.beforeEach((to) => {
  // here we check it the user is logged in
  // if they aren't and the route requries auth we redirect to the login page
const { isLoggedIn } = useAuthUser();
if (!isLoggedIn() && to.meta.requiresAuth) {
  return { name: "login" };
}
});


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
