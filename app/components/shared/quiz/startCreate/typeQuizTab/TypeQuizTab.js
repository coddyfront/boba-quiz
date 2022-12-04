import React, {Fragment, useState} from 'react';
import {Tab} from '@headlessui/react'
import {observer} from 'mobx-react-lite'
import {QUIZ_TYPE} from "../../../../../configs/QuizConfigs";
import {newQuizStore} from "../../../../../store/NewQuizStore";
import InputText from "../../../../ui/InputText";
import TextButton from "../../../../ui/TextButton";
import {useRouter} from "next/router";

const TypeQuizTab = observer(
    () => {

        const router = useRouter()
        console.log(router)

        const [title, setTitle] = useState('')

        const changeTitle = (text) => {
            setTitle(text)
            console.log(title)
        }

        const goToCreateQuestion = () => {
            newQuizStore.changeQuizTitle(title)
            router.push('/quiz/create')
        }

        return (
            <div className="rounded-xl border-main_blue bg-main_blue border-solid border-4 w-1/2 flex flex-col">
                <Tab.Group>
                    <Tab.List className="grid grid-cols-2 bg-main_blue">
                        {
                            Object.keys(QUIZ_TYPE).map((type) =>
                                <Tab as={Fragment} onClick={() => newQuizStore.changeQuizType(QUIZ_TYPE[type])}>
                                    {
                                        ({selected}) =>
                                            <button
                                                className={`focus:outline-none rounded-xl p-2
                                                ${selected ? 'bg-white text-main_blue' : 'text-white'}`}>
                                                <p>{QUIZ_TYPE[type]}</p>
                                            </button>
                                    }
                                </Tab>
                            )
                        }
                    </Tab.List>
                </Tab.Group>
                <div className="rounded-xl bg-white p-3">
                    <InputText placeholder={`Введите название вашего ${newQuizStore.currentQuiz.type}а`}
                               action={changeTitle}/>
                </div>
                <TextButton text={`Перейти к созданию ${newQuizStore.currentQuiz.type}а`} bgColor={"bg-main_green"}
                            textColor={"text-white"} action={goToCreateQuestion} disabled={!title}/>
            </div>
        )
    }
)

export default TypeQuizTab;
