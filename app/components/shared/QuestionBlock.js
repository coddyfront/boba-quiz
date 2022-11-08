import React from 'react';
import ListBox from "../ui/ListBox";
import InputText from "../ui/InputText";
import AnswerList from "./AnswerList";
import TextButton from "../ui/TextButton";

const QuestionBlock = ({question, number, action, typesAnswerList, removeQuestion}) => {

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

    const changeTypeAnswers = (selected) => {
        let temp = {...question}
        temp.typeAnswer = selected
        changeQuestionInList(0)
    }

    const removeQuestionInList = () => {
        removeQuestion(number)
    }

    return (
        <div className="w-1/2 rounded-2xl bg-white p-6 border-solid border-4 border-main_blue my-2">
            <div className="flex justify-between items-center">
                <h2 className="">Вопрос {number + 1}</h2>
                <ListBox variants={typesAnswerList} action={changeTypeAnswers} currentSelected={question.typeAnswer}/>
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
