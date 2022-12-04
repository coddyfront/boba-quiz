import React from 'react';
import AnswerBlock from "./AnswerBlock";

const AnswerList = ({answersList, typeAnswer, action}) => {


    const changeAnswersInList = (answerObject, numberAnswer) => {
        action(answerObject, numberAnswer)
    }

    return (
        <div className="flex flex-col content-center">
            <form>
                {
                    answersList.map((answer, index) =>
                        <AnswerBlock type={typeAnswer} action={changeAnswersInList} numberAnswer={index}
                                     answer={answer}
                                     key={answer.text + index}/>
                    )
                }
            </form>
        </div>
    );
};

export default AnswerList;
