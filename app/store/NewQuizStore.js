import {ANSWER_TYPE_IN_QUESTION, QUIZ_TYPE} from "../configs/QuizConfigs";
import {makeAutoObservable} from "mobx"

class NewQuizStore {
    currentQuiz = {...this.defaultQuiz()}

    constructor() {
        makeAutoObservable(this)
    }

    defaultQuiz() {
        return {
            type: QUIZ_TYPE.TEST,
            title: '',
            questionsList: [this.defaultQuestion()]
        }
    }

    defaultQuestion() {
        return {
            type: ANSWER_TYPE_IN_QUESTION.SINGLE,
            config: {},
            questionText: '',
            answersList: [this.defaultAnswer()],
            rightAnswer: []
        }
    }

    defaultAnswer() {
        return {
            text: '',
            rightFlag: false
        }
    }

    changeQuizTitle(title) {
        this.currentQuiz.title = title
    }

    changeQuizType(type) {
        switch (type) {
            case QUIZ_TYPE.TEST: {
                this.currentQuiz.type = QUIZ_TYPE.TEST
                break
            }
            case QUIZ_TYPE.SURVEY: {
                this.currentQuiz.type = QUIZ_TYPE.SURVEY
                break
            }
            default:
                break
        }
        console.log(this.currentQuiz)
    }

    changeQuestionText(questionText, questionID) {
        this.currentQuiz.questionsList[questionID].questionText = questionText
    }

    changeQuestionType(type, questionID) {
        switch (type) {
            case ANSWER_TYPE_IN_QUESTION.SINGLE: {
                this.currentQuiz.questionsList[questionID].type = ANSWER_TYPE_IN_QUESTION.SINGLE
                break
            }
            case ANSWER_TYPE_IN_QUESTION.SEVERAL: {
                this.currentQuiz.questionsList[questionID].type = ANSWER_TYPE_IN_QUESTION.SEVERAL
                break
            }
            default:
                break
        }
    }

    removeQuestion(questionID) {
        this.currentQuiz.questionsList.splice(questionID, 1)
    }

    addAnswerInQuestion(questionID) {
        this.currentQuiz.questionsList[questionID].answersList.push({...this.defaultAnswer()})
    }

    changeAnswerInQuestion(answerObject, answerID, questionID) {
        this.currentQuiz.questionsList[questionID].answersList[answerID] = {...answerObject}
    }

    removeAnswerInQuestion(answerID, questionID) {
        this.currentQuiz.questionsList[questionID].answersList.splice(answerID, 1)
    }

}


export const newQuizStore = new NewQuizStore()
