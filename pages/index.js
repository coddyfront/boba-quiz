export default function Home({props}) {
    return (
        <>
            <h1>Привет!</h1>
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