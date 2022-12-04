import React, {useEffect, useState} from 'react';
import QuestionBlock from "./QuestionBlock";
import TextButton from "../../../ui/TextButton";
import TypeOfQuestionList from "./TypeOfQuestionList";
import {newQuizStore} from "../../../../store/NewQuizStore";
import {ANSWER_TYPE_IN_QUESTION} from "../../../../configs/QuizConfigs";

const QuestionList =
    () => {

        console.log('QuestionList')


        const [activeQuestionNumber, setActiveQuestionNumber] = useState(0)
        const [questionList, setQuestionList] = useState(newQuizStore.currentQuiz.questionsList)

        let [changeQuestionFlag, setChangeQuestionFlag] = useState(true)


        useEffect(() => {
            setQuestionList(newQuizStore.currentQuiz.questionsList)
            // configStore.focusedElement()
        }, [changeQuestionFlag])

        const addQuestion = () => {
            newQuizStore.currentQuiz.questionsList.push({
                ...newQuizStore.defaultQuestion()
            })
            setChangeQuestionFlag((prev) => !prev)
        }

        const changeQuestionText = (text, questionID) => {
            newQuizStore.changeQuestionText(text, questionID)
            setChangeQuestionFlag((prev) => !prev)
        }

        const changeTypeAnswers = (type, questionID) => {
            newQuizStore.changeQuestionType(type, questionID)
            setChangeQuestionFlag((prev) => !prev)
        }

        const setActiveQuestion = (questionNumber) => {
            setActiveQuestionNumber(questionNumber)
        }

        // const changeAnswersList = () => {
        //     setChangeQuestionFlag((prev) => !prev)
        // }

        // const checkCanAddQuestion = () => {
        //     console.log(questionList)
        //     questionList.map((question) => {
        //         if (!question.questionText) {
        //             console.log('badtext')
        //             return false
        //         }
        //         question.answersList.map((answer) => {
        //             console.log(answer.rightFlag)
        //             if (answer.rightFlag) {
        //                 return true
        //             }
        //         })
        //     })
        //     console.log('bad')
        //     return false
        // }


        return (
            <div className="grid grid-cols-1_2 h-full">
                <div className="flex flex-col items-center">
                    <h2 className="my-3">Тип вопроса</h2>
                    {
                        <TypeOfQuestionList questionNumber={activeQuestionNumber}
                                            changeTypeAnswers={changeTypeAnswers}
                                            typesAnswerList={ANSWER_TYPE_IN_QUESTION}/>
                    }
                </div>
                <div className="flex flex-col items-center overflow-y-scroll">
                    <h2 className="my-3">Создание {newQuizStore.currentQuiz.type}а
                        "{newQuizStore.currentQuiz.title}"</h2>
                    <div className="w-full h-screen-130px flex flex-col items-center">
                        {
                            questionList.map((question, index) =>
                                <QuestionBlock question={question} numberQuestion={index}
                                               changeQuestionText={changeQuestionText}
                                               typesAnswerList={ANSWER_TYPE_IN_QUESTION}
                                               active={index === activeQuestionNumber}
                                               setActive={setActiveQuestion}
                                               updateQuestionList={() => setChangeQuestionFlag(prev => !prev)}
                                               key={`${question.questionText + index}`}/>
                            )
                        }
                        <TextButton text={"Добавить вопрос"} textColor={"text-white"} bgColor={"bg-main_gray"}
                                    style={'w-1/2'}
                                    action={addQuestion}
                        />
                    </div>
                </div>
            </div>
        );
    }

export default QuestionList;
