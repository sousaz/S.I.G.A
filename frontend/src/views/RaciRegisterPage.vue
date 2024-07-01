<template>
    <div class="raci-register">
    <NavBarComponent :links="navLinks"></NavBarComponent>
    <section>
      <div class="div-left">
        <form @submit.prevent="handleSubmit">
          <div class="div-register">
            <h1>Cadastrar Aluno</h1>
          </div>

          <div class="div-input">
                <input type="text" v-model="this.formData.username" placeholder="Usuário" name="username" required>
                <input type="text" v-model="this.formData.name" placeholder="Nome completo" name="name" required>
                <input type="text" v-model="this.formData.cpf" placeholder="CPF" name="cpf" required>
                <input type="text" v-model="this.formData.course" placeholder="Curso" name="course" required>
                <input type="password" v-model="this.formData.password" placeholder="Senha" required>
                <button type="submit" name="botao" id="botao" class="botao" @click="register()">Cadastrar</button>
            </div>
        </form>
      </div>

      <div class="div-right">
        <img src="../assets/image/fundo2.png" alt="">
      </div>
    </section>
  </div>
</template>

<script>
import axios from '../services/api';
import{toast} from "vue3-toastify";
import 'vue3-toastify/dist/index.css';
import NavBarComponent from '@/components/NavBarComponent.vue';

export default {
    name: 'RaciRegisterPage',
    components: {
        NavBarComponent
    },
    data() {
        return {
            formData: {
                username: '',
                name: '',
                cpf: '',
                course: '',
                password: ''
            },
            navLinks: [
                { text: 'Lista', to: "/listar-alunos" },
                { text: 'Cadastrar', to: "/registrar-raci" },
                { text: 'Acessos', to: "/raci" },
                { text: 'QrCode', to: "/acesso" }
            ]
        }
    },
    methods: {
        async register(){
            try{
                await axios.post('/raci', this.formData);
                toast.success("Cadastro realizado!");
            }catch(error){
                toast.error("Ocorreu um erro")
            } 
        }
    }
}
</script>

<style scoped>
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

.raci-register{
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

.div-cadastro{
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
    background: #546F50;
}

section:hover h1::before{ 
    width: 100%;
}

.div-input{
    display: flex;
    flex-direction: column;
}
input{
    background-color: transparent;
    padding: 20px;
    padding-right: 100px;
    border: none;
    border: 2px solid #08090B;
    color: #fff; 
    border-radius:5px ;
    margin: 10px 0; 
    outline: none; 
    font-size: 18px;
}



button{
    border: none;
    background-color: #546F50;
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
    background-color: #EA5058;
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

img{
    height: 100%;
    width: 100%;
}

</style>