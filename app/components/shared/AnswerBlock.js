import React from 'react';
import InputText from "../ui/InputText";

const AnswerBlock = ({type, action, number, answerText}) => {

    const changeAnswer = (text) => {
        action(text, number)
    }

    return (
        <div className="flex">
            {
                {
                    'single':
                        <div className="flex items-center w-full">
                            <input type="radio" disabled
                                   className="w-10 h-10 mr-10"/>
                            <InputText placeholder="Введите ответ" action={changeAnswer} value={answerText}/>
                        </div>,
                    'several':
                        <div className="flex items-center w-full">
                            <input type="checkbox" disabled
                                   className="w-10 h-10 mr-10"/>
                            <InputText placeholder="Введите ответ" value={answerText}/>
                        </div>,
                }[type]
            }
        </div>
    );
};

export default AnswerBlock;
