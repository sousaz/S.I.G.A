<script lang="ts">
import beep from '../assets/infobleep.mp3'
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
      console.log('User:', user)
      const audio = new Audio(beep)
      audio.play()
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
