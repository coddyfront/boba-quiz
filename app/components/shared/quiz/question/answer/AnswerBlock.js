import React from 'react';
import InputText from "../../../../ui/InputText";

const AnswerBlock = ({type, action, numberAnswer, answer}) => {

    const changeAnswer = (answerObject) => {
        action(answerObject, numberAnswer)
    }

    const changeTextAnswer = (text) => {
        changeAnswer({...answer, text: text})
    }

    return (
        <div className="flex">
            {
                {
                    'Один вариант':
                        <div className="flex items-center w-full">
                            <input type="radio"
                                   className="w-10 h-10 mr-10 cursor-pointer"
                                   checked={answer.rightFlag}
                                   onChange={() => changeAnswer({...answer, rightFlag: true})}
                                   name="rightFlag"/>
                            <InputText placeholder="Введите ответ" action={changeTextAnswer} value={answer.text}
                                       id={`singleTypeQuestionID${numberAnswer}`}/>
                        </div>,
                    'Несколько вариантов':
                        <div className="flex items-center w-full">
                            <input type="checkbox"
                                   className="w-10 h-10 mr-10 cursor-pointer" checked={answer.rightFlag}
                                   onClick={() => changeAnswer({...answer, rightFlag: !answer.rightFlag})}
                                   name="rightFlag"/>
                            <InputText placeholder="Введите ответ" action={changeAnswer} value={answer.text}/>
                        </div>,
                }[type]
            }
        </div>
    );
};

export default AnswerBlock;
