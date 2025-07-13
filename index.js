// Load env vars
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.SUPABASE_SERVICE_ROLE_KEY)
import { createClient } from '@supabase/supabase-js';

// Pull from env
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Example: Get all rows from "users" table
async function testSupabase() {
    const { data, error } = await supabase
        .from('orders')
        .select('*');

    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Data:', data);
    }
}

testSupabase();
