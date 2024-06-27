import Dexie, { Table } from 'dexie'

interface AccessEntry {
  id?: number
  userId: string
  token: string
  timestamp: Date
}

class AccessDatabase extends Dexie {
  accessEntries!: Table<AccessEntry>

  constructor() {
    super('AccessDatabase')
    this.version(1).stores({
      accessEntries: '++id, userId, token, timestamp'
    })
  }
}

export const db = new AccessDatabase();
