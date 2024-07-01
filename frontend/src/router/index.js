import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import DegpPage from '@/views/DegpPage.vue';
import DegpRegisterPage from '@/views/DegpRegisterPage.vue';
import DegpListPage from '@/views/DegpListPage.vue';
import ManagementPage from '@/views/ManagementPage.vue';
import RaciPage from '@/views/RaciPage.vue';
import RaciRegisterPage from '@/views/RaciRegisterPage.vue';
import RaciListPage from '@/views/RaciListPage.vue';
import SecurityPage from '@/views/SecurityPage.vue';
import SecurityListPage from '@/views/SecurityListPage.vue';
import SecurityRegisterPage from '@/views/SecurityRegisterPage.vue';
import AdmPage from '@/views/AdmPage.vue';
import AdmRegisterPage from '@/views/AdmRegisterPage.vue';
import QrCodePage from '@/views/QrCodePage.vue';
import { jwtDecode } from 'jwt-decode';


const routes = [
  {
    name: 'loginScreen',
    path: '/',
    component: LoginPage,
  },
  {
    name: 'degpScreen',
    path: '/degp',
    component: DegpPage,
    meta: { requiresAuth: true, roles: ['DEGP'] }
  },
  {
    name: 'degpRegisterScreen',
    path: '/registrar-degp',
    component: DegpRegisterPage,
    meta: { requiresAuth: true, roles: ['DEGP'] }
  },
  {
    name: 'degpListScreen',
    path: '/listar-servidores',
    component: DegpListPage,
    meta: { requiresAuth: true, roles: ['DEGP'] }
  },
  {
    name: 'managementScreen',
    path: '/gestao',
    component: ManagementPage,
    meta: { requiresAuth: true, roles: ['GESTAO'] }
  },
  {
    name: 'raciScreen',
    path: '/raci',
    component: RaciPage,
    meta: { requiresAuth: true, roles: ['RACI'] }
  },
  {
    name: 'raciRegisterScreen',
    path: '/registrar-raci',
    component: RaciRegisterPage,
    meta: { requiresAuth: true, roles: ['RACI'] }
  },
  {
    name: 'raciListScreen',
    path: '/listar-alunos',
    component: RaciListPage,
    meta: { requiresAuth: true, roles: ['RACI'] }
  },
  {
    name: 'securityScreen',
    path: '/guarita',
    component: SecurityPage,
    meta: { requiresAuth: true, roles: ['SEGURANCA'] }
  },
  {
    name: 'securityRegisterScreen',
    path: '/registrar-visitante',
    component: SecurityRegisterPage,
    meta: { requiresAuth: true, roles: ['SEGURANCA'] }
  },
  {
    name: 'securityListScreen',
    path: '/listar-visitantes',
    component: SecurityListPage,
    meta: { requiresAuth: true, roles: ['SEGURANCA'] }
  },
  {
    name: 'admScreen',
    path: '/administracao',
    component: AdmPage,
    meta: { requiresAuth: true, roles: ['ADMIN'] }
  },
  {
    name: "admRegisterScreen",
    path: "/registrar-administracao",
    component: AdmRegisterPage,
    meta: { requiresAuth: true, roles: ['ADMIN'] }
  }, 
  {
    name: 'qrCodeScreen',
    path: '/acesso',
    component: QrCodePage,
    meta: { requiresAuth: true, roles: ['ALUNO','SERVIDOR', 'DEGP', 'RACI', 'SEGURANCA', 'GESTAO'] }
  }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const role = getRole()

  if(to.meta.requiresAuth && !hasAccess(role, to.meta.roles)){
    return next({name: 'loginScreen'})
  }
  next()
})

export default router;

function getRole() {
  const token = localStorage.getItem('token')
  if(!token) return null
  return jwtDecode(token).payload.role
}

function hasAccess(userRoles, requiredRoles) {
  return requiredRoles.includes(userRoles)
}
