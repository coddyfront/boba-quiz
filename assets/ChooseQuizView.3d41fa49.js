import{o as n,c as u,b as e,f as d,v as a,h as l,j as h}from"./index.500326f4.js";import{_ as c}from"./_plugin-vue_export-helper.cdc0426e.js";const p={name:"ChooseQuizView",data(){return{quizId:""}},updated(){this.$route.query.error==="1"&&(this.toastError("\u041A\u0432\u0438\u0437\u0430 \u0441 \u0434\u0430\u043D\u043D\u044B\u043C ID \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442!"),this.$router.push({name:"chooseQuiz"}))},methods:{chooseQuiz(){this.quizId!=""?this.$router.push({name:"completeQuiz",params:{quizId:this.quizId}}):this.toastError("\u041A\u0432\u0438\u0437\u0430 \u0441 \u0434\u0430\u043D\u043D\u044B\u043C ID \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442!")}},watch:{quizId(){}},setup(){return{toastError:t=>{h({title:"\u041E\u0448\u0438\u0431\u043A\u0430",description:t},{position:"top-right",type:"danger",transition:"bounce",showIcon:"true",timeout:3e3})}}}},m={class:"flex flex-col md:w-big w-full mx-auto px-8 py-4 mt-8 items-center bg-white rounded-md transition animate-jello-horizontal"},z=e("h2",{class:"text-center font-bold text-2xl tracking-wide mb-4"},"\u041D\u0430\u0447\u0438\u043D\u0430\u0435\u043C \u{1F60E}",-1),w={class:"divide-2 group flex divide-rhino-400 rounded-md bg-rhino-50 md:w-2/3"},x=e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})],-1),f=[x];function _(s,t,g,v,i,r){return n(),u("div",m,[z,e("div",w,[d(e("input",{type:"text",class:"input rounded-r-none","onUpdate:modelValue":t[0]||(t[0]=o=>i.quizId=o),onKeyup:t[1]||(t[1]=l((...o)=>r.chooseQuiz&&r.chooseQuiz(...o),["enter"])),placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 ID Boba Quiz"},null,544),[[a,i.quizId]]),e("button",{type:"submit",class:"cursor-pointer rounded-lg rounded-l-none p-2 text-rhino-500 transition duration-200 ease-in-out hover:bg-rhino-500 hover:text-rhino-50",onClick:t[2]||(t[2]=(...o)=>r.chooseQuiz&&r.chooseQuiz(...o))},f)])])}const Q=c(p,[["render",_]]);export{Q as default};
