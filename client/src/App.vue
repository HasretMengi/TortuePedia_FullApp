<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app>
            <v-list dense v-if="drawer">
                <v-list-item-group color="primary">
                    <v-list-item v-for="(item, i) in menuItems" :key="i" :to="item.link" link>
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="toolbar-title">TortuePedia : L'encyclopédie de tortues</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>
  
<script>
export default {
    name: 'App',
    data() {
        return {
            drawer: false,
            menuItems: [],
        };
    },
    created() {
        this.updateMenuItems();
    },
    watch: {
        $route() {
            this.updateMenuItems();
        },
    },
    methods: {
        updateMenuItems() {
            const isLoggedIn = !!localStorage.getItem('token');
            if (isLoggedIn) {
                this.menuItems = [
                    { title: 'Home', icon: 'mdi-home', link: '/home' },
                    { title: 'Add Tortue', icon: 'mdi-note-plus', link: '/add-tortue' },
                    { title: 'About', icon: 'mdi-help-box', link: '/about' },
                    { title: 'Déconnexion', icon: 'mdi-logout', link: '/logout' },

                ];
            } else {
                this.menuItems = [
                    { title: 'Signup', icon: 'mdi-account-plus', link: '/signup' },
                    { title: 'Login', icon: 'mdi-login', link: '/login' },
                ];
            }
        },
    },
};
</script>
<style scoped>

.toolbar-title {
    font-size: 24px;
    font-weight: bold;
    color: #042f11;
    text-align: center;
    padding: 10px;
   font-family: 'Times New Roman', Times, serif;
 
}
</style>