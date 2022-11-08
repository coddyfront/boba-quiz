import React, {useState} from 'react';
import AnswerBlock from "./AnswerBlock";

const AnswerList = ({answersList, typeAnswer, action}) => {


    const changeAnswersInList = (answer, number) => {
        const temp = [...answersList]
        temp[number] = answer
        if (temp[temp.length - 1]) {
            temp.push('')
        }
        action([...temp])
    }

    return (
        <div className="flex flex-col content-center">
            {
                answersList.map((item, index) =>
                    <AnswerBlock type={typeAnswer} action={changeAnswersInList} number={index} answerText={item}/>
                )
            }
        </div>
    );
};

export default AnswerList;
