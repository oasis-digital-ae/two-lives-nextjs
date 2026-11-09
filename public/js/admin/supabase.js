// Load Supabase client from CDN (already included in HTML)

const SUPABASE_URL = "https://iceaceywsecnlmkcqopu.supabase.co";
const SUPABASE_ANON = "sb_publishable_HC5p_ycaiSfyqVevN0tiiQ_bAiC7H9r";

window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
