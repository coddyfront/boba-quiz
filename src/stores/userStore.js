import { defineStore } from 'pinia';
import useAuthUser from "@/composables/useAuthUser";
import {ref} from 'vue'
export const useUserStore = defineStore('userStore', ()=>{
    const authUser = ref(null)
    async function signUp(form) {
        const {register, login} = useAuthUser()
        try {
          console.log(form.value)
            // use the register method from the AuthUser composable
            await register(form.value).then(async ()=>{
              await login(form.value)
            })
            // const redirectTo = 'home'
            // return {redirectTo}
          } catch (error) {
            return error
          }
    }
    return {authUser, signUp}

})