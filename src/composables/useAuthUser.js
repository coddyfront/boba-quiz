import { ref } from "vue";
import useSupabase from "@/composables/useSupaBase";

const user = ref(null)
 // user is set outside of the useAuthUser function
// so that it will act as global state and always refer to a single user

export default function useAuthUser() {
  /**
   * Login with email and password
   */
  const { supabase } = useSupabase();
  const login = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signIn({email, password});
    if (error) throw error;
    console.log(user)
    // await setUser(user)
    return
  }
  /**
   * Login with google, github, etc
   */
  const loginWithSocialProvider = async (provider) => {
    const { user, error } = await supabase.auth.signIn({ provider });
    if (error) throw error;
    return user
  };

  /**
   * Logout
   */
   const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  /**
   * Check if the user is logged in or not
   */
   const isLoggedIn = () => {
    return !!user.value;
   };

  /**
   * Register
   */
   const register = async ({ email, password, ...meta }) => {
    console.log(email, password)
    const { user, error } = await supabase.auth.signUp(
      { email, password },
      { 
       data: meta,
    //    redirectTo: `${window.location.origin}/login`,
     }
    );
        if (error) throw error;
        return user;
    };
  /**
   * Update user email, password, or meta data
   */
   const update = async (data) => {
    const { user, error } = await supabase.auth.update(data);
    if (error) throw error;
    return user;
    };

  /**
   * Send user an email to reset their password
   * (ie. support "Forgot Password?")
   */


  return {
    user,
    login,
    loginWithSocialProvider,
    isLoggedIn,
    logout,
    register,
    update,
  };
}