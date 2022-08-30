
<template>
<div class="flex flex-col md:w-big w-full mx-auto px-8 py-4 mt-8 items-center bg-white rounded-md transition animate-jello-horizontal">
    <h2 class="text-center font-bold text-2xl tracking-wide mb-4">Начинаем 😎</h2>
    <div class="divide-2 group flex divide-rhino-400 rounded-md bg-rhino-50 md:w-2/3">
        <input type="text" class="input rounded-r-none" v-model="quizId" @keyup.enter="chooseQuiz" placeholder="Введите ID Boba Quiz" />
        <button type="submit" class="cursor-pointer rounded-lg rounded-l-none p-2 text-rhino-500 transition duration-200 ease-in-out hover:bg-rhino-500 hover:text-rhino-50 "   @click="chooseQuiz">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>
    </div>  
</div>

</template>

<script>
import { createToast } from 'mosha-vue-toastify';
// import the styling for the toast
import 'mosha-vue-toastify/dist/style.css';
export default {
    name: "ChooseQuizView",
    data() {
        return {
            quizId: ""
        }
    },
    updated(){
        if(this.$route.query.error === '1'){
            this.toastError('Квиза с данным ID не существует!')
            this.$router.push({ name: 'chooseQuiz'})
        }
    },
    methods: {
        chooseQuiz(){
            if (this.quizId != "") {
                this.$router.push({ name: 'completeQuiz', params: { quizId: this.quizId } })
            }else {
            this.toastError('Квиза с данным ID не существует!')

            }
        }
    },
    watch: {
        quizId() {

        }
    },
    setup() {
        const toastError = (descriptionError) => {
          createToast({
            title: 'Ошибка',
            description: descriptionError,
            },
            {
            position: 'top-right',
            type: 'danger',
            transition: 'bounce',
            showIcon: 'true',
            timeout: 3000,
            })
          }
          return { toastError }
    }
}
</script>