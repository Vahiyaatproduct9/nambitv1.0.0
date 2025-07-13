import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv'
dotenv.config()
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAdminKey = process.env.SUPABSE_ADMIN_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAdminKey);
export default supabase;