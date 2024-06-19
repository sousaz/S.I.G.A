<script lang="ts">
import beep from '../assets/infobleep.mp3'
import beepWarning from '../assets/beep-warning.mp3'
export default {
  name: 'QrcodeReader',
  data() {
    return {
      paused: false
    }
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
      this.paused = true
      await this.timeOut(100)
      this.paused = false
    },

    timeOut(ms: number) {
      return new Promise((resolve) => {
        window.setTimeout(resolve, ms)
      })
    }
  }
}
</script>

<template>
  <qrcode-stream :paused="paused" @detect="onDetect"></qrcode-stream>
</template>
