<template>
    <v-container>
        <v-alert border="left" close-text="Close Alert" color="success" dark dismissible>
            Vous avez été déconnecté avec succès.
        </v-alert>
    </v-container>
</template>
  
<script>
export default {
    name: "Logout",
    mounted() {

        localStorage.removeItem("token");
        this.$router.push({ name: "app" });
    },
};
</script>
  