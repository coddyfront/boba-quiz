<template>
    
    <div class="quiz flex items-center justify-center relative">
      <!-- stepper -->
        <div class="flex flex-col justify-center items-start w-full md:w-big relative mb-5 mx-2 lg:mx-0 rounded-lg bg-white px-4 py-2 border-2 border-stone-100 sm:px-6 sm:py-3 shadow-lg ">
            <div class="flex justify-between w-full items-center">
                <div class="flex gap-3 items-end">
                    <h3 class="font-semibold text-xl">Результаты</h3>
                    <span class="text-lime-300">{{correctAnswers}}</span>
                    <span class="text-rose-400">{{uncorrectAnswers}}</span>
                </div>
                <button class="btn-secondary px-2 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                    </svg>
                </button>
            </div>
            
        </div>
    </div>
</template>

<script>
import {useResultsQuizStore } from '@/stores/quizResults';
import {mapState} from 'pinia';

export default {
    name: 'ResultsQuiz',
    computed: {
        ...mapState(useResultsQuizStore, ['correctAnswers', 'uncorrectAnswers']),
    },
    setup() {
        const store = useResultsQuizStore()
        return {store}
    },
    created(){
        this.store.getResults()
    }
}
</script>