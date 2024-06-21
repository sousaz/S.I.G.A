<script lang="ts">
import beep from '../assets/infobleep.mp3'
import beepWarning from '../assets/beep-warning.mp3'
import { db } from '../config/dexieConfig.ts'
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
      const rawValue = detectedCodes[0].rawValue
      const regex = /{id:"(.+)",token:"(.+)"}/
      const matches = rawValue.match(regex)

      const user = {
        id: matches[1],
        token: matches[2]
      }

      if (this.online) await this.sendDataToServer(user)
      else this.saveDataLocally(user)

      this.paused = true
      await this.timeOut(100)
      this.paused = false
    },

    timeOut(ms: number) {
      return new Promise((resolve) => {
        window.setTimeout(resolve, ms)
      })
    },

    async sendDataToServer(user: { id: string; token: string }): Promise<void> {
      await fetch('http://localhost:3000/api/v1/accessEntry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user.id,
          token: user.token
        })
      }).then((response) => {
        if (!response.ok) {
          const audio = new Audio(beepWarning)
          audio.play()
          return
        }
        const audio = new Audio(beep)
        audio.play()
        return response.json()
      })
    },

    async saveDataLocally(user: { id: string; token: string }): void {
      await db.accessEntries.add({
        userId: user.id,
        token: user.token,
        timestamp: new Date()
      })
    },

    async syncData() {
      const entries = await db.accessEntries.toArray()
      entries.forEach(async (entry) => {
        await this.sendDataToServer({
          userId: entry.userId,
          token: entry.token
        })

        await db.accessEntries.delete(entry.userId)
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
