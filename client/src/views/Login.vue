<template>
  <v-container>
    <v-card class="mx-auto" style="max-width: 500px;">
      <v-toolbar color="green dark-4" flat>
        <v-card-title class="text-h6 font-weight-regular">
          Connexion
        </v-card-title>
      </v-toolbar>

      <v-form ref="form" v-model="form" @submit.prevent="submitForm" class="pa-4 pt-6">
        <v-text-field v-model="user.username" filled color="deep-green" label="Nom d'utilisateur"></v-text-field>

        <v-text-field v-if="!user.username" v-model="user.email" :rules="[rules.email]" filled color="deep-green"
          label="Adresse e-mail" type="email"></v-text-field>

        <v-text-field v-model="user.password" :rules="[rules.password, rules.length(8)]" filled color="deep-green" counter="8"
          label="Mot de passe" style="min-height: 96px" type="password"></v-text-field>
      </v-form>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn text @click="$refs.form.reset()">Effacer</v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="!form" :loading="isLoading" class="white--text" color="green accent-8" depressed @click="submitForm">
          Soumettre
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import API from '../api';

export default {
  name: 'Login',
  data() {
    return {
      rules: {
        email: v => (!this.user.username && !!(v || '').match(/@/)) || 'Veuillez entrer une adresse e-mail valide',
        length: len => v => (v || '').length >= len || `Longueur invalide, ${len} caractères requis`,
        password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) || 'Le mot de passe doit contenir une lettre majuscule, un chiffre et un caractère spécial',
      },
      form: true,
      isLoading: false,
      user: {
        username: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async submitForm() {
      const userData = {
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
      };

      if (this.$refs.form.validate()) {
        try {
          const res = await API.login(userData);
          if (res.token) {
            localStorage.setItem('token', res.token);
            this.$router.push({name: "home"});
          } else {
            this.$router.push({ name: "NotFound" });
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
};
</script>
