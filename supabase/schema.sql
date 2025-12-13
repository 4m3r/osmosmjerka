-- Create leaderboard table
CREATE TABLE IF NOT EXISTS leaderboard (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player_name TEXT,
  completion_time INTEGER NOT NULL,
  difficulty TEXT NOT NULL,
  category TEXT NOT NULL,
  score INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_leaderboard_difficulty_category 
  ON leaderboard(difficulty, category, completion_time);

-- Enable Row Level Security (RLS)
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read leaderboard
CREATE POLICY "Allow public read access" 
  ON leaderboard FOR SELECT 
  USING (true);

-- Create policy to allow anyone to insert scores
CREATE POLICY "Allow public insert access" 
  ON leaderboard FOR INSERT 
  WITH CHECK (true);
