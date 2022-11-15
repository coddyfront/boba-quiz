import React from 'react';
import InputText from "../ui/InputText";
import AnswerList from "./AnswerList";
import TextButton from "../ui/TextButton";

const QuestionBlock = ({question, number, action, removeQuestion, active, setActive}) => {

    console.log(active)

    const changeQuestionText = (text) => {
        let temp = {...question}
        temp.questionText = text
        changeQuestionInList(temp)
    }

    const changeAnswers = (answersList) => {
        let temp = {...question}
        temp.answersList = [...answersList]
        changeQuestionInList(temp)
    }

    const changeQuestionInList = (answer) => {
        action(answer, number)
    }

    const removeQuestionInList = () => {
        removeQuestion(number)
    }

    return (
        <div className={`w-1/2 rounded-2xl p-6 border-${active ? "gray" : "main_blue"} border-solid border-4 my-2 `}
             onClick={setActive}>
            <div className="flex justify-between items-center">
                <h2 className="">Вопрос {number + 1}</h2>
                <TextButton text={"Удалить"} color={"main_blue"} bgColor={"red-600"} action={removeQuestionInList}/>
            </div>
            <InputText placeholder={"Введите вопрос"} required={true} action={changeQuestionText}
                       value={question.questionText}/>
            <AnswerList answersList={question.answersList} typeAnswer={question.typeAnswer.value}
                        action={changeAnswers}/>
        </div>
    );
};

export default QuestionBlock;
