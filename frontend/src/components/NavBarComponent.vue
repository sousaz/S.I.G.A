<template>
    <aside>
        <nav class="navbar">
            <div class="inputSearch">
                <router-link v-for="link in links" :key="link.text" :to="link.to" active-class="active">
                    {{ link.text }}
                </router-link>
            </div>
        </nav>
    </aside>
</template>

<script>
export default {
    name: "NavBarComponent",
    props: {
        links: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
aside {
    background-color: transparent;
    width: 150px;
    position: fixed;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
}

.navbar {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-top: 2rem;
}

.inputSearch {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
}

.navbar a {
    font-size: 1.3rem;
    border-radius: 1rem;
    padding: 0.7rem;
    color: #ffffff;
    text-decoration: none;
    width: 100%;
    text-align: left;
    margin-bottom: 0.5rem;
}

.navbar .active {
    color: rgb(230, 230, 236);
    background: #546F50;
}

.navbar a:hover {
    color: rgb(230, 230, 236);
    background: #EA5058;
}
</style>


