import { ref } from "vue";
import useSupabase from "@/composables/useSupaBase";
import useAuthUser from "@/composables/useAuthUser";

export default function useQuiz() {
    const {supabase} = useSupabase()
    const getQuizById = async(quizId) => {
        let { data, error } = await supabase
        .from('quizes')
        .select('data').eq('quizId', quizId)
        return {data, error}
    }

    const insertQuiz = async(quizData, quizId) => {
        const { data, error } = await supabase
        .from('quizes')
        .insert([
            { quizId: quizId, data: JSON.stringify(quizData) },
        ])
        return {data, error}
    }
    const applyResults = async(quizId, results) => {
        const {user} = useAuthUser()
        console.log(user)

        console.log()
        const { data, error } = await supabase
        .from('user_quiz')
        .insert([
            { user_id: user.value.id, quiz_id: quizId, results: JSON.stringify({results}) },
        ])
        console.log(error)
        return {data, error}
    }
    const getResults = async (quizId) => {
        const {user} = useAuthUser();
        let { data, error } = await supabase
        .from('user_quiz')
        .select('results').match({ quiz_id: quizId, user_id: user.value.id })
        console.log(error)

        return {data, error}
    }
    return {
        getQuizById, insertQuiz,applyResults,getResults
    }
}