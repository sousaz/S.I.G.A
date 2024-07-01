<template>
  <div class="container">
    <canvas ref="qrcodeCanvas"></canvas>
  </div>
</template>

<script>
import QRCode from 'qrcode'

export default {
   name: 'QrCodePage',
  methods: {
    generateQRCode() {
      const code = `{id:"${localStorage.getItem('userId')}",token:"${localStorage.getItem('token')}"}`
      const canvas = this.$refs.qrcodeCanvas
      QRCode.toCanvas(canvas, code, {width: 400, height: 400},function (error) {
        if (error) console.error(error)
        console.log('QR code generated!')
      })
    }
  },
  mounted() {
    this.generateQRCode()
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #060606;

}

.qrcode {
  border: 1px solid #000;
}

</style>
