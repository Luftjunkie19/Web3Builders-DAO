import {createClient} from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

export const supabaseConfig = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_API_KEY as string
)