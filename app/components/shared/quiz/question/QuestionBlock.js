import React, {useRef} from 'react';
import InputText from "../../../ui/InputText";
import AnswerList from "./answer/AnswerList";
import TextButton from "../../../ui/TextButton";
import {newQuizStore} from "../../../../store/NewQuizStore";
import {ANSWER_TYPE_IN_QUESTION} from "../../../../configs/QuizConfigs";
import {configStore} from "../../../../store/ConfigStore";

const QuestionBlock = ({
                           question,
                           numberQuestion,
                           changeQuestionText,
                           active,
                           setActive,
                           updateQuestionList
                       }) => {

    configStore.focusedElement()

    const clickDelete = useRef(false)

    const changeQuestionTextLocal = (text) => {
        changeQuestionText(text, numberQuestion)
    }

    const changeAnswers = (answer, numberAnswer) => {
        if (numberAnswer === question.answersList.length - 1 && answer.text !== '') {
            newQuizStore.addAnswerInQuestion(numberQuestion)
        } else {
            if (answer.text === '') {
                newQuizStore.removeAnswerInQuestion(numberAnswer, numberQuestion)
            }
        }
        if (newQuizStore.currentQuiz.questionsList[numberQuestion].type === ANSWER_TYPE_IN_QUESTION.SINGLE) {
            if (answer.rightFlag) {
                newQuizStore.currentQuiz.questionsList[numberQuestion].answersList.map((answerItem, index) => {
                    if (index !== numberAnswer) {
                        newQuizStore.changeAnswerInQuestion({...answerItem, rightFlag: false}, index, numberQuestion)
                    }
                })
            }
        }
        newQuizStore.changeAnswerInQuestion(answer, numberAnswer, numberQuestion)
        updateQuestionList()
    }

    const removeQuestionInList = () => {
        setActiveQuestion('deleteQuestionButton')
        newQuizStore.removeQuestion(numberQuestion)
        updateQuestionList()
    }

    const setActiveQuestion = (elementID) => {
        if (!clickDelete.current) {
            if (elementID !== 'deleteQuestionButton') {
                setActive(numberQuestion)
            } else {
                if (active) {
                    setActive(numberQuestion === 0 ? 0 : numberQuestion - 1)
                } else {
                    setActive(numberQuestion === newQuizStore.currentQuiz.questionsList.length - 1 ? numberQuestion - 1 : numberQuestion)
                }
                clickDelete.current = true
                return
            }
        }
        clickDelete.current = false
    }

    return (
        <div
            className={`w-1/2 rounded-2xl p-6 ${active ? "border-main_blue" : "border-main_gray cursor-pointer"} border-solid border-4 my-2 `}
            onClick={() => setActiveQuestion('')}
            id={`parentQuestionBlock ${numberQuestion}`}>
            <div className="flex justify-between items-center">
                <h2 className="">Вопрос {numberQuestion + 1}</h2>
                <TextButton text={"Удалить"} textColor={"text-white"}
                            disabled={newQuizStore.currentQuiz.questionsList.length === 1}
                            bgColor={"bg-main_red"}
                            action={removeQuestionInList}
                            id={`deleteQuestionButton ${numberQuestion}`}
                />
            </div>
            <InputText placeholder={"Введите вопрос"} required={true} action={changeQuestionTextLocal}
                       value={question.questionText}/>
            <AnswerList answersList={question.answersList} typeAnswer={question.type}
                        action={changeAnswers}
            />
        </div>
    );
};

export default QuestionBlock;
