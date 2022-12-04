import React from 'react';
import TypeQuizTab from "../shared/quiz/startCreate/typeQuizTab/TypeQuizTab";

const StartCreateQuizScreen = () => {
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-h2 p-10">Добро пожаловать в BobaQuiz!</h2>
            <TypeQuizTab/>
        </div>
    );
};

export default StartCreateQuizScreen;
