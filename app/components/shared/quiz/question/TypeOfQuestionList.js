import React from 'react';
import TextButton from "../../../ui/TextButton";
import {observer} from "mobx-react-lite";
import {newQuizStore} from "../../../../store/NewQuizStore";

const TypeOfQuestionList = observer(
    ({questionNumber, changeTypeAnswers, typesAnswerList}) => {

        return (
            <div className="flex flex-col items-center">
                <div className="rounded-2xl bg-white p-6 border-solid border-4 border-main_blue
            h-screen-130px overflow-y-scroll">
                    <div className="flex justify-between items-center flex-col">
                        {
                            Object.keys(typesAnswerList).map((type, index) =>
                                <TextButton text={typesAnswerList[type]} textColor={"text-white"}
                                            bgColor={"bg-main_blue"}
                                            style={"w-full my-1"}
                                            disabled={typesAnswerList[type] === newQuizStore.currentQuiz.questionsList[questionNumber].type}
                                            action={() => changeTypeAnswers(typesAnswerList[type], questionNumber)}
                                            key={type + index}/>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    })

export default TypeOfQuestionList;
