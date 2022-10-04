
<template>
    <div class="flex flex-col max-w-[384px] w-full mx-auto px-8 py-4 mt-8 items-center bg-white rounded-xl transition animate-jello-horizontal">
        <h2 class="text-center font-bold text-2xl tracking-wide mb-4">Начинаем </h2>
        <input type="input" class="input" placeholder="Введите ID Boba Quiz" v-model="quizId">
        <button class="btn-primary w-full mt-2 justify-center group relative inline-flex animate-scale-up-center items-center gap-x-2" @click="chooseQuiz">
            <span class="absolute right-0 translate-x-full transition-transform group-hover:-translate-x-4">
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </span>
            <span class="transition-all group-hover:mr-4"> Поехали </span>
        </button>
    </div>
    </template>
    
    <script>
    import { createToast } from 'mosha-vue-toastify';
    import 'mosha-vue-toastify/dist/style.css';
    export default {
        name: "ChooseQuizView",
        data() {
            return {
                quizId: "",
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
                    this.$router.push({ name: 'solveView', params: { quizId: this.quizId}, });
                }else {
                this.toastError('Квиза с данным ID не существует!')
                }
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
                showIcon: true,
                timeout: 3000,
                })
              }
              return { toastError }
        }
    }
    </script>