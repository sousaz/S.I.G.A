<template>
<div class="management-page">
    <NavBarComponent :links="navLinks"></NavBarComponent>
    <div class="container">
        <div class="table-header">
            <div class="icone">
                <img src="../assets/image/1x/Ativo 1.png" class="logo">
                <h2>Acessos Gerais</h2>
            </div>
            <input type="text" class="search" v-model="searchQuery" placeholder="Buscar...">
        </div>

        <div class="tabela">
            <table>
                <tr>
                    <th>Nome</th>
                    <th>Data</th>
                    <th>Acesso</th>
                    <th>Tipo</th>
                </tr>
                <tr v-for="(user, i) in filteredUsers" :key="i">
                    <td>{{user.user[0].name}}</td>
                    <td>{{getFormattedDate(user.date)}}</td>
                    <td>{{user.isinside==true?"entrada":"saida"}}</td>
                    <td>{{user.user[0].role}}</td>
                </tr>
            </table>
        </div>
    </div>
</div>
  
</template>

<script>
import axios from "../services/api"
import NavBarComponent from '@/components/NavBarComponent.vue';
import format from '@/utils/formatDate.js'

export default {
    name: 'ManagementPage',
    components: {
        NavBarComponent
    },
    data(){
        return{
            users:[],
            managerActive: false,
            degpActive: false,
            raciActive: false,
            navLinks: [
                { text: 'Lista', to: "/gestao" },
                { text: 'QrCode', to: "/acesso" },
            ],
            searchQuery: ""  
        }
    },
    methods:{
        async getUsers(){
            const response = await axios.get("/manager")
            this.users = response.data.access
            console.log(this.users)
        },

        getFormattedDate(date){
            return format(date)
        }
    },
    mounted(){
        this.getUsers()
    },
    computed:{
        filteredUsers(){
            return this.users.filter(user => 
                user.user[0].name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                this.getFormattedDate(user.date).toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                user.user[0].role.toLowerCase().includes(this.searchQuery.toLowerCase())
            )
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
}

.management-page{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    width: 100vw;
    background-color: #08090B;

}

.container{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: 70%;
    background-color: #242424;
    border-radius: 20px;

}

.table-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.search{
    margin-right: 30px;
    background-color: transparent;
    padding: 20px;
    padding-right: 100px;
    border: none;
    border: 2px solid #666970;
    color: #fff; 
    border-radius:20px ;
    outline: none; 
    font-size: 18px;
}

.icone{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 30px;
    width: 100%;
    border-radius: 20px 20px 0 0;
    color: #fff;
    background-color: #242424;
}

h2{
    padding-left: 20px;
}

.logo{
    width: 50px;  
    height: 50px; 
}


.tabela{
    background-color: #fff;
    border-radius: 20px;
    padding: 30px;
    width: 100%;           
    height: 500px;
    box-sizing: border-box;  
}

.container .tabela table{
    width: 100%;
    height: 100;
    border-collapse: collapse;
}

.container table tr {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%; 
    background-color: #faf6f6;
}

th{
    background-color: #08090B;
    border: 1px solid #ccc;
    border-color: #fff;
    color: white;
}

.container table th, .container table td {
    flex: 1; 
    text-align: left; 
    padding: 8px; 
}
</style>