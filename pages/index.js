import StartCreateQuizScreen from "../app/components/screens/StartCreateQuizScreen";

export default function Home({props}) {
    return (
        <>
            <StartCreateQuizScreen/>
        </>
    )
}

export async function getStaticProps() {

    return {
        props: {
            title: 'Главная',
            description: 'Описание',
        },
    }
}