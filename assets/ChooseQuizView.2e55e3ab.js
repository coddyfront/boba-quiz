import{_ as n,o as u,c as d,b as t,d as a,v as l,e as h,t as c}from"./index.6de832e5.js";const p={name:"ChooseQuizView",data(){return{quizId:""}},updated(){this.$route.query.error==="1"&&(this.toastError("\u041A\u0432\u0438\u0437\u0430 \u0441 \u0434\u0430\u043D\u043D\u044B\u043C ID \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442!"),this.$router.push({name:"chooseQuiz"}))},methods:{chooseQuiz(){this.quizId!=""?this.$router.push({name:"completeQuiz",params:{quizId:this.quizId}}):this.toastError("\u041A\u0432\u0438\u0437\u0430 \u0441 \u0434\u0430\u043D\u043D\u044B\u043C ID \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442!")}},watch:{quizId(){}},setup(){return{toastError:e=>{c({title:"\u041E\u0448\u0438\u0431\u043A\u0430",description:e},{position:"top-right",type:"danger",transition:"bounce",showIcon:"true",timeout:3e3})}}}},m={class:"flex flex-col md:w-big w-full mx-auto px-8 py-4 mt-8 items-center bg-white rounded-md transition animate-jello-horizontal"},z=t("h2",{class:"text-center font-bold text-2xl tracking-wide mb-4"},"\u041D\u0430\u0447\u0438\u043D\u0430\u0435\u043C \u{1F60E}",-1),w={class:"divide-2 group flex divide-rhino-400 rounded-md bg-rhino-50 md:w-2/3"},x=t("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})],-1),f=[x];function _(s,e,g,v,r,i){return u(),d("div",m,[z,t("div",w,[a(t("input",{type:"text",class:"input rounded-r-none","onUpdate:modelValue":e[0]||(e[0]=o=>r.quizId=o),onKeyup:e[1]||(e[1]=h((...o)=>i.chooseQuiz&&i.chooseQuiz(...o),["enter"])),placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 ID Boba Quiz"},null,544),[[l,r.quizId]]),t("button",{type:"submit",class:"cursor-pointer rounded-lg rounded-l-none p-2 text-rhino-500 transition duration-200 ease-in-out hover:bg-rhino-500 hover:text-rhino-50",onClick:e[2]||(e[2]=(...o)=>i.chooseQuiz&&i.chooseQuiz(...o))},f)])])}const I=n(p,[["render",_]]);export{I as default};
