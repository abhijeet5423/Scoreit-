// src/utils/indexedDB.js
import { openDB } from 'idb';

const DB_NAME = 'CricketScoringDB';
const MATCH_STORE = 'matches';
const BALLS_STORE = 'balls';

// ✅ Initialize the database
export async function initDB() {
  return openDB(DB_NAME, 2, {
    upgrade(db) {
      // Matches store
      if (!db.objectStoreNames.contains(MATCH_STORE)) {
        db.createObjectStore(MATCH_STORE, { keyPath: 'id', autoIncrement: true });
      }

      // Balls store
      if (!db.objectStoreNames.contains(BALLS_STORE)) {
        const store = db.createObjectStore(BALLS_STORE, { keyPath: 'ballId', autoIncrement: true });
        store.createIndex('matchId', 'matchId', { unique: false }); // For fetching balls by match
      }
    },
  });
}

// ✅ Save a match
export async function saveMatchToDB(matchData) {
  const db = await initDB();
  const id = await db.add(MATCH_STORE, matchData);
  console.log('✅ Match saved locally:', matchData);
  return id;
}

// ✅ Get all matches
export async function getAllMatchesFromDB() {
  const db = await initDB();
  return await db.getAll(MATCH_STORE);
}

// ✅ Get a single match by ID
export async function getMatchFromDB(matchId) {
  const db = await initDB();
  return await db.get(MATCH_STORE, matchId);
}

// ✅ Save a ball-by-ball record
export async function saveBallToDB(ballData) {
  const db = await initDB();
  await db.add(BALLS_STORE, ballData);
  console.log('🏏 Ball saved:', ballData);
}

// ✅ Get all balls for a specific match
export async function getBallsByMatchId(matchId) {
  const db = await initDB();
  return await db.getAllFromIndex(BALLS_STORE, 'matchId', matchId);
}

// ✅ Delete a specific match (and its balls)
export async function deleteMatchFromDB(matchId) {
  const db = await initDB();
  await db.delete(MATCH_STORE, matchId);

  // Delete all balls related to this match
  const tx = db.transaction(BALLS_STORE, 'readwrite');
  const index = tx.store.index('matchId');
  let cursor = await index.openCursor(matchId);
  while (cursor) {
    await cursor.delete();
    cursor = await cursor.continue();
  }

  console.log(`🗑️ Deleted match ${matchId} and its balls`);
}

// ✅ Clear all data
export async function clearAllData() {
  const db = await initDB();
  await db.clear(MATCH_STORE);
  await db.clear(BALLS_STORE);
  console.log('🧹 All match and ball data cleared');
}
