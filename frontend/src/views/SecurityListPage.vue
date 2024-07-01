<template>
    <div class="security-page">
    <NavBarComponent :links="navLinks"></NavBarComponent>
    <div class="container">
        <div class="table-header">
            <div class="icone">
                <img src="../assets/image/1x/Ativo 1.png" class="logo">
                <h2>Visitantes</h2>
            </div>
            <input type="text" class="search" v-model="searchQuery" placeholder="Buscar...">
        </div>

        
        <div class="tabela">
            <table>
                <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                    
                    <th class="editar-acesso">Imprimir QrCode</th>
                </tr>
                <tr v-for="(visitor, i) in filteredVisitors" :key="i">
                    <td>{{visitor.name}}</td>
                    <td>{{visitor.cpf}}</td>
                    
                    <td>
                        <button class="btn-remover" @click="printOut(visitor._id)">Imprimir</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div>
<canvas style="display:none;" ref="qrcodeCanvas"></canvas>
</template>

<script>
import axios from "../services/api";
import NavBarComponent from '@/components/NavBarComponent.vue';
import QRCode from 'qrcode'

export default {
    name: 'SecuritListPage',
    components: {
        NavBarComponent
    },
    data(){
        return{
            visitors:[],
            navLinks: [
                { text: 'Lista', to: "/listar-visitantes" },
                { text: 'Cadastrar', to: "/registrar-visitante" },
                { text: 'Acessos', to: "/guarita" },
                { text: 'QrCode', to: "/acesso" }
            ],
            searchQuery: ""
        }
    },
    methods:{
        async getVisitors(){
            const response = await axios.get("/temporaryAccess")
            this.visitors = response.data.visitors
            console.log(this.visitors)
        }, 
        async printOut(id){
            const response = await axios.post(`/temporaryAccess/printout`, {userId: id})
            const code = `{id:"${response.data.userId}",token:"${response.data.token}"}`
            const canvas = this.$refs.qrcodeCanvas;
            QRCode.toCanvas(canvas, code, {width: 400, height: 400})
            const dataUrl = canvas.toDataURL(); 
            const windowPrint = window.open('', '_blank');
            windowPrint.document.write(`<html><head><title>Imprimir QR Code</title></head><body><img src="${dataUrl}" onload="window.print();window.close()" /></body></html>`);
            windowPrint.document.close();
        }
    },
    mounted(){
        this.getVisitors()
    },
    computed:{
        filteredVisitors(){
            return this.visitors.filter(visitor => 
                visitor.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                visitor.cpf.toLowerCase().includes(this.searchQuery.toLowerCase())
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

.security-page{
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
.editar-acesso{
    display: flex;
    justify-content: center;
}
th{
    background-color: #08090B;
    border: 1px solid #ccc;
    border-color: #fff;
    color: white;
}
.container table th,
.container table td {
    flex: 1; 
    text-align: left; 
    padding: 8px; 
}

.btn-remover{
    width: 100%;
    height: 30px;
    border: none;
    background-color: #546F50;
    color: white;
    border-radius: 20px;
}
.btn-remover:hover{
    transition: 0.2s;
    background-color: #EA5058;
    color: #08090B;
    cursor: pointer;

}

</style>