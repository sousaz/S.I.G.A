<template>
   <div class="app">
    <section>
      <div class="div-left">
        <img src="../assets/image/1x/Ativo 2.png" width="200px">
        <form @submit.prevent="handleSubmit">
          <div class="div-login">
            <h1>LOGIN</h1>
          </div>

          <div class="div-input">
            <div class="input">
              <input type="text" v-model="this.formData.username" placeholder="Usuário" required>
            </div>
            <div class="input">
              <input type="password" v-model="this.formData.password" placeholder="Senha" required>
            </div>
          </div>

          <button type="submit" @click="login()">Entrar</button>
        </form>
      </div>

      <div class="div-right">
        <img src="../assets/image/fundo3.png" alt="">
      </div>
    </section>
  </div>
</template>

<script>
import axios from "../services/api"
import { jwtDecode} from 'jwt-decode'
import{toast} from "vue3-toastify";
import 'vue3-toastify/dist/index.css'

export default {
  name: 'LoginPage',
  data() {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login(){
      try {
        const response = await axios.post('/login', this.formData)
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("userId", response.data.user.id)
        const role = jwtDecode(response.data.token).payload.role
        switch(role) {
          case 'DEGP':
            return this.$router.push({name: 'degpScreen'})
          case 'GESTAO':
            return this.$router.push({name: 'managementScreen'})
          case 'RACI':
            return this.$router.push({name: 'raciScreen'})
          case 'SEGURANCA':
            return this.$router.push({name: 'securityScreen'})
          case 'ADMIN':
            return this.$router.push({name: 'admScreen'})
          default:
            return this.$router.push({name: 'qrCodeScreen'})
        }
      } catch (error) {
        console.log(error.response.data.error)
        toast.error(error.response.data.error)
      }
    }
  }
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@200&display=swap');

@font-face {
  font-family: Rolie Twily;
  src: url(/siga/fontes/Rolie\ Twily.otf);
}

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Work Sans", sans-serif;
  font-weight: 400;
  font-style: normal;
  color: white;
}

.app{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #08090B;
}

section{
  display: flex;
  flex-direction: row;
  position: absolute; 
  background-color: transparent;
}

.div-left{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #242424;
  padding:50px;
}

img{
  padding: 23px 0px;
}


form{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.div-login{
  display: flex;
  flex-direction: column;
  width: 100%;
}

h1{
  position: relative;
  padding: 20px 0px;
}

h1::before{ 
  content: " ";
  position: absolute;
  height: 6px;
  bottom: -3px;
  width: 0%; 
  transition: width 0.3s ease; 
  border-radius: 25px;
  background: #EA5058;
}

section:hover h1::before{ 
  width: 100%;
}


.div-input{
  width: 100%;
}

input{
  background-color: transparent;
  padding: 20px;
  padding-right: 100px;
  border: none;
  border: 2px solid #08090B;
  color: #fff; 
  border-radius:5px ;
  margin: 20px 0; 
  outline: none; 
  font-size: 18px;
}

input::placeholder{
  color: #5f5f5f; 
}

button{
  border: none;
  background-color: #EA5058;
  border-radius: 4px;
  padding: 15px;
  width: 100%;
  margin: 10px 0 0px 0px;
  font-size: 20px;
}

button a{
  color: #fff;
}

button:hover{
  background-color: #546F50;
  color: #fff;
  cursor: pointer;
  transition: 0.2s;
}

button:hover a{
  color: #fff;
}

.div-right{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #EA5058;
  background-color: #546F50;
  height: 700px;
  width: 500px;
}
</style>