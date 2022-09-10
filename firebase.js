import firebase from "firebase/app";
import "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase .google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjnnmlPU6Or-arX15JZpLP1QHzEtgtkWQ",
  authDomain: "custom-repeater-251017.firebaseapp.com",
  projectId: "custom-repeater-251017",
  storageBucket: "custom-repeater-251017.appspot.com",
  messagingSenderId: "1070416993819",
  appId: "1:1070416993819:web:3e8a874288fe9245bf22be",
  measurementId: "G-JSZ62S3HLJ"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const quiezCollection = db.collection('quizes')


const createQuizDB = async (quiz) => {
  return quiezCollection.add(quiz)
  // let quizAllReadyExists = await getQuiz(quiz.quizId)
  // console.log(quizAllReadyExists + "quizAllReadyExists")
  // if (quizAllReadyExists === null) return quiezCollection.add(quiz)
  // else return null
}
const getQuiz = async (quizId) => {
  let quiz = await quiezCollection.where("quizId", "==", quizId).limit(1).get()
  quiz = quiz.docs.filter(doc => {
        return doc.data()
  })[0]
  console.log(quiz) // undefined || Firestore quiz Object
  if (quiz !== undefined && quiz.exists) return quiz.data()
  else return null
}
export {createQuizDB,getQuiz}
