<script lang="ts">
import beep from '../assets/infobleep.mp3'
import beepWarning from '../assets/beep-warning.mp3'
import { db } from '../config/dexieConfig'
export default {
  name: 'QrcodeReader',
  data() {
    return {
      paused: false,
      online: navigator.onLine
    }
  },
  created() {
    window.addEventListener('online', this.syncData)
    window.addEventListener('offline', this.updateOnlineStatus)
  },
  beforeUnmount() {
    window.removeEventListener('online', this.syncData)
    window.removeEventListener('offline', this.updateOnlineStatus)
  },
  methods: {
    async onDetect(detectedCodes: object): Promise<void> {
      try {
        const rawValue = detectedCodes[0].rawValue
        const regex = /{id:"(.+)",token:"(.+)"}/
        const matches = rawValue.match(regex)

        const user = {
          id: matches[1],
          token: matches[2],
          timestamp: null
        }

        if (this.online) await this.sendDataToServer(user)
        else await this.saveDataLocally(user)

        const audio = new Audio(beep)
        audio.play()
      } catch (error) {
        console.log(error)
        const audio = new Audio(beepWarning)
        audio.play()
      } finally {
        this.paused = true
        await this.timeOut(100)
        this.paused = false
      }
    },

    timeOut(ms: number) {
      return new Promise((resolve) => {
        window.setTimeout(resolve, ms)
      })
    },

    async sendDataToServer(user: { id: string; token: string, timestamp: Date }): Promise<void> {
      try {
        await fetch('http://localhost:3000/api/v1/accessEntry', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${user.token}`
          },
          body: JSON.stringify({
            userId: user.id,
            timestamp: user.timestamp || null
          })
        }).then((response) => {
          if (!response.ok) {
            throw new Error('Failed to send data to the server')
          }
          return response.json()
        })
      } catch (error) {
        throw new Error('Failed to send data to the server')
      }
    },

    async saveDataLocally(user: { id: string; token: string }): Promise<void> {
      await db.accessEntries.add({
        userId: user.id,
        token: user.token,
        timestamp: Date.now()
      })
    },

    async syncData() {
      const entries = await db.accessEntries.toArray()
      entries.forEach(async (entry) => {
        try {
          await this.sendDataToServer({
            id: entry.userId,
            token: entry.token,
            timestamp: entry.timestamp
          })
          await db.accessEntries.delete(entry.id)
        } catch (error) {
          throw new Error('Failed to sync data to the server')
        }
      })
    },

    updateOnlineStatus() {
      this.online = navigator.onLine
    }
  }
}
</script>

<template>
  <qrcode-stream :paused="paused" @detect="onDetect"></qrcode-stream>
</template>
