import { useCreateQuizStore } from '../stores/quiz';

async function checkQuizToCreate(){
    console.log('start checking.....')
    const store = useCreateQuizStore()
    if (store.quiz.length == 1) {
        return true
    }
    for (let i = 0; i <= store.quiz.length-1; i++) {
        console.log(store.quiz[i].typeOfQuestion)
        if (store.quiz[i].typeOfQuestion === "radio") {
            if (store.quiz[i].answers.length === 0
                || store.quiz[i].question === ""
                || store.quiz[i].user_answer === "") {
                    console.log('error')
                    if (store.questionNumber == store.quiz.length-1){
                        console.log(11111)
                        return 'create without last question'
                    }
                    return true;
            }
        }
        if (store.quiz[i].typeOfQuestion === "multiple") {
            if (store.quiz[i].answers.length === 0
                || store.quiz[i].question === ""
                || store.quiz[i].user_answers.length === 0) {
                    console.log('error')
                    if (store.questionNumber == store.quiz.length){
                        return 'create without last question'
                    }
                    return true;
            }
        }
    }
    return false

}
export {checkQuizToCreate}