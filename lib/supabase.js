import { createClient } from "@supabase/supabase-js";

const url = "https://iaerevpsqnkvllcgluxc.supabase.co"

const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhZXJldnBzcW5rdmxsY2dsdXhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA3NzY5ODEsImV4cCI6MjAxNjM1Mjk4MX0.yFCJ5t7MKdKKDXM7MH9wyd5KkASbYkxWCG8xou05SzA"

const supabase = createClient(url, anonKey);

export default supabase

// Supabase db password: 3t1zqoOAwJGUouls
