import Dexie from 'dexie'

export const db = new Dexie('AccessDatabase')
db.version(1).stores({
  accessEntries: 'id++, userId, token, timestamp'
})
