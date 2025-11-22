// ======================
// Supabase Configuration
// ======================

// Safe to expose. anon key is public by design.
export const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
export const SUPABASE_ANON_KEY = "YOUR_PUBLIC_ANON_KEY";


// =======================
// Leaderboard / API Setup
// =======================

// How many entries to show in the leaderboard
export const LEADERBOARD_LIMIT = 10;


// =======================
// Game Configuration
// =======================

// Default player stat limits (optional)
// Useful if you want consistent values across scenes.
export const DEFAULT_PLAYER_STATS = {
    maxHealth: 100,
    moveSpeed: 250,
    jumpVelocity: -400
};


// =======================
// UI / Scene Settings
// =======================

// For nickname input positioning (MenuScene)
export const NICKNAME_INPUT_STYLE = {
    top: "160px",
    left: "50px",
    fontSize: "20px",
    zIndex: 1000
};
