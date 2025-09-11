// Import the Supabase client
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Your Supabase credentials
const supabaseUrl = "https://edifjuufdyixrelkowdl.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkaWZqdXVmZHlpeHJlbGtvd2RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1NDg1NzMsImV4cCI6MjA3MzEyNDU3M30.JEzBcaGXABJ3yIk2iYrRvOwzDAwNE_Xwae1BXhUfE_Q";

// Create client
export const supabase = createClient(supabaseUrl, supabaseKey);
