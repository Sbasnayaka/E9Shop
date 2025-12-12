// Supabase Configuration (Public - Safe to commit)
// The anon key is meant to be public - it's protected by Row Level Security (RLS)
const SUPABASE_URL = 'https://yjoutipjzlljwuebvmbd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlqb3V0aXBqemxsand1ZWJ2bWJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MTc2NzIsImV4cCI6MjA4MDk5MzY3Mn0.6uETDRJDduodR_OEkFarhO917QUSLlBcDSQnkKMlSdA';

// Initialize Supabase client
if (typeof window.supabase !== 'undefined') {
  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  window.supabaseClient = supabase;
}

