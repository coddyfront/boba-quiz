import React, {useEffect, useState} from 'react';
import QuestionBlock from "./QuestionBlock";
import TextButton from "../ui/TextButton";
import TypeOfQuestionList from "./TypeOfQuestionList";

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

    const [questionsList, setQuestionsList] = useState([])
    const [activeQuestionNumber, setActiveQuestionNumber] = useState(0)
    const [isRender, setIsRender] = useState(false)


    useEffect(() => {
        setQuestionsList([{
            questionText: '',
            answersList: [''],
            typeAnswer: typesAnswerList[0]
        }])
        setIsRender(true)
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
        const clearAnswer = questionDTO === 0
        if (clearAnswer) {
            questionDTO = {
                questionText: questionsList[number].questionText,
                answersList: [''],
                typeAnswer: questionsList[number].typeAnswer
            }
        }
        temp[number] = {...questionDTO}
        setQuestionsList([...temp])
    }

    const changeTypeAnswers = (selected, number) => {
        let temp = {...questionsList}
        temp[number].typeAnswer = selected
        changeQuestion(0, number)
    }

    return (
        <div className="grid grid-cols-1_2 h-full">
            <div className="flex flex-col items-center">
                <h2 className="my-3">Тип вопроса</h2>
                {
                    isRender &&
                    <TypeOfQuestionList questionNumber={activeQuestionNumber}
                                        question={questionsList[activeQuestionNumber]}
                                        changeTypeAnswers={changeTypeAnswers}
                                        typesAnswerList={typesAnswerList}/>
                }
            </div>
            <div className="flex flex-col items-center overflow-y-scroll">
                <h2 className="my-3">Создание теста</h2>
                <div className="w-full h-screen-130px flex flex-col items-center">
                    {
                        questionsList.map((question, index) =>
                            <QuestionBlock question={question} number={index} action={changeQuestion}
                                           typesAnswerList={typesAnswerList} removeQuestion={removeQuestion}
                                           active={index === activeQuestionNumber}
                                           setActive={() => setActiveQuestionNumber(index)}/>
                        )
                    }
                    <TextButton text={"Добавить вопрос"} color={"white"} bgColor={"main_blue"} style={'w-1/2'}
                                action={addQuestion}/>
                </div>
            </div>
        </div>
    );
};

export default QuestionList;
