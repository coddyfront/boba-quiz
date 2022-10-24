<template>
    <div class="divide-2 group flex divide-rhino-400 rounded-md bg-rhino-50 w-full md:w-10/12">
        <input class="input min-w-max rounded-r-none" type="text" @focus="newAnswerFocused = true" @blur="newAnswerFocused = false" v-model="newAnswer" @keyup.enter="e=> e.target.blur()"  placeholder="Введите новый ответ" ref="newAnswer">
        <button type="submit" class="cursor-pointer rounded-lg rounded-l-none p-2 text-rhino-500 transition duration-200 ease-in-out hover:bg-rhino-500 hover:text-rhino-50 "  @click="chooseQuiz">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>
    </div>
</template>
<script>
import {mapState} from 'pinia';
import { useCreateQuizStore } from '@/stores/quiz';
import {toastError} from '../../services/toast.js'
export default {
    props: ['questionNumber'],
    data(){
        return {
          newAnswerFocused: true,
          newAnswer: "",
        }
    },
    mounted(){
        this.toastError = toastError
    },
    computed: {
        ...mapState(useCreateQuizStore, ['quiz']),
    },
    watch: {
        newAnswerFocused(newData, oldData) {
          // console.log(newData)
          if (newData === false && this.newAnswer !== "") {
            this.quiz[this.questionNumber].answers.push(this.newAnswer.trim())
            this.newAnswer = ""
            // this.$refs['newAnswer'].focus()
           console.log(this.$refs)
            // this.$emit('addNewAnswer', this.quiz[this.questionNumber].answers.length-1)

            // console.log(this.quiz[this.current_question.position].answers)
          } else if (this.newAnswer === "" && newData === false) return 
        }
      }
}
</script>