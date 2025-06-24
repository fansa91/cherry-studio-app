import { drizzle } from 'drizzle-orm/expo-sqlite'
import * as SQLite from 'expo-sqlite'

export const DATABASE_NAME = 'cherry_studio_test.db'
export const expoDb = SQLite.openDatabaseSync(DATABASE_NAME, { enableChangeListener: true })
export const db = drizzle(expoDb)
