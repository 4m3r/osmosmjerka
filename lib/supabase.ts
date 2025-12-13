import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface LeaderboardEntry {
  id?: string;
  player_name: string | null;
  completion_time: number;
  difficulty: string;
  category: string;
  score: number;
  created_at?: string;
}

export async function submitScore(
  entry: Omit<LeaderboardEntry, "id" | "created_at">
) {
  const { data, error } = await supabase
    .from("leaderboard")
    .insert([entry])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getTopScores(
  difficulty: string,
  category: string,
  limit: number = 10
) {
  const { data, error } = await supabase
    .from("leaderboard")
    .select("*")
    .eq("difficulty", difficulty)
    .eq("category", category)
    .order("completion_time", { ascending: true })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getAllTimeTopScores(limit: number = 10) {
  const { data, error } = await supabase
    .from("leaderboard")
    .select("*")
    .order("completion_time", { ascending: true })
    .limit(limit);

  if (error) throw error;
  return data;
}
