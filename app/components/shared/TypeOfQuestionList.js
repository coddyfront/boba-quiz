import React from 'react';
import TextButton from "../ui/TextButton";

const TypeOfQuestionList = ({questionNumber, question, changeTypeAnswers, typesAnswerList}) => {

    return (
        <div className="flex flex-col items-center">
            <div className="rounded-2xl bg-white p-6 border-solid border-4 border-main_blue
            h-screen-130px overflow-y-scroll">
                <div className="flex justify-between items-center flex-col">
                    {
                        typesAnswerList.map((item) =>
                            <TextButton text={item.text} color={"white"} bgColor={"main_blue"} style={"w-full my-1"}
                                        disabled={item.id === question.typeAnswer.id}
                                        action={() => changeTypeAnswers(item, questionNumber)}/>)
                    }
                </div>
            </div>
        </div>
    );
};

export default TypeOfQuestionList;
