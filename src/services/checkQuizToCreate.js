import { useCreateQuizStore } from '../stores/quiz';

async function checkQuizToCreate(){
    console.log('start checking.....')
    const store = await useCreateQuizStore()
    for (let i = 0; i <= store.questionNumber; i++) {
        if (store.quiz[i].typeOfQuestion === "radio") {
            if (store.quiz[i].answers.length === 0
                || store.quiz[i].question === ""
                || store.quiz[i].user_answer === "") {
                    console.log('error')
                    return true;
            }
        }
        if (store.quiz[i].typeOfQuestion === "multiple") {
            if (store.quiz[i].answers.length === 0
                || store.quiz[i].question === ""
                || store.quiz[i].user_answers.length === 0) {
                    console.log('error')
                    return true;
            }
        }
    }
    return false

}
export {checkQuizToCreate}