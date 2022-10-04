import { createClient } from "@supabase/supabase-js";
import useAuthUser from "@/composables/useAuthUser";
// these can come from an environment variable if desired
// not required however as they are 100% exposed on the client side anyway 
// and that's ok, Supabase expects this (security is provided by Row Level Security)
const supabaseUrl = "https://hbbcjtckpdzewewbwfpc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiYmNqdGNrcGR6ZXdld2J3ZnBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM2Njg3MzQsImV4cCI6MTk3OTI0NDczNH0.HF9Bnv9DYgeWecdqMduSc-Xo0rIFWFgn64c-uPOdg38";

// setup client
const supabase = createClient(supabaseUrl, supabaseKey, {
  db: {
    schema: 'public',
  }
});
supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser();
  user.value = session?.user || null;
});
// expose supabase client
export default function useSupabase() {
  return { supabase };
}