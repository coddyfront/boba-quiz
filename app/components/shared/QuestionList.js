import React, {useEffect, useState} from 'react';
import QuestionBlock from "./QuestionBlock";
import TextButton from "../ui/TextButton";

const QuestionList = () => {

    const typesAnswerList = [
        {
            id: 1,
            text: "Один вариант",
            value: "single"
        },
        {
            id: 2,
            text: "Несколько вариантов",
            value: "several"
        },
    ]

    let [questionsList, setQuestionsList] = useState([])

    useEffect(()=> {
        setQuestionsList([{
            questionText: '',
            answersList: [''],
            typeAnswer: typesAnswerList[0]
        }])
    }, [])

    const addQuestion = () => {
        const temp = [...questionsList]
        temp.push({
            questionText: '',
            answersList: [''],
            typeAnswer: typesAnswerList[0]
        })
        setQuestionsList([...temp])
    }

    const removeQuestion = (number) => {
        if (questionsList.length !== 1) {
            const temp = [...questionsList.slice(0, number), ...questionsList.slice(number + 1)]
            setQuestionsList([...temp])
        }
    }

    const changeQuestion = (questionDTO, number) => {
        const temp = [...questionsList]
        if (questionDTO === 0) {
            questionDTO = {
                questionText: questionsList[number].questionText,
                answersList: [''],
                typeAnswer: questionsList[number].typeAnswer
            }
        }
        temp[number] = {...questionDTO}
        setQuestionsList([...temp])
    }

    console.log(questionsList)

    return (
        <div className="flex flex-col items-center">
            {
                questionsList.map((question, index) =>
                    <QuestionBlock question={question} number={index} action={changeQuestion}
                                   typesAnswerList={typesAnswerList} removeQuestion={removeQuestion}/>
                )
            }
            <TextButton text={"Добавить вопрос"} color={"white"} bgColor={"main_blue"} action={addQuestion}/>
        </div>
    );
};

export default QuestionList;
