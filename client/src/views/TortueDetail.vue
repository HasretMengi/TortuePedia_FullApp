<template>
    <v-app>
      <v-main>
        <v-container>
          <v-row align="center" justify="center">
            <v-col sm="10" class="pa-4 mx-auto">
              <v-card class="pa-2">
                <v-img :src="`/${tortue.image}`" 
                ></v-img>
                <v-card-title class="text-h5 mb-3 text-center">{{ tortue.nom }}</v-card-title>
                <v-card-subtitle class="text-h6 mb-2">Nom Latin: {{ tortue.nomLatin }}</v-card-subtitle>
                <v-card-text class="text--secondary">
                  <p class="param-label"><span class="param-name">Espèce:</span> {{ tortue.espece }}</p>
                  <p class="param-label"><span class="param-name">Vitesse:</span> {{ tortue.vitesse }} (en km/h)</p>
                  <p class="param-label"><span class="param-name">Habitat:</span> {{ tortue.habitat }}</p>
                  <p class="param-label"><span class="param-name">Alimentation:</span> {{ tortue.alimentation }}</p>
                  <p class="param-label"><span class="param-name">Âge maximum:</span> {{ tortue.ageMax }} ans</p>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="success" text :to="{ name: 'edit-tortue', params: { id: tortue._id } }">Edit</v-btn>
                  <v-btn color="red" text @click="removeTortue(tortue._id)">Delete</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import API from "../api";
  
  export default {
    data() {
      return {
        drawer: null,
        tortue: {},
      };
    },
    async created() {
      const res = await API.getTortueById(this.$route.params.id);
      this.tortue = res;
    },
    methods: {
      async removeTortue(id) {
        const res = await API.deleteTortue(id);
        this.$router.push({ name: "home", params: { message: res.message } });
      },
    },
  };
  </script>
  
  <style scoped>
  .param-label {
    margin-bottom: 8px;
  }
  
  .param-name {
    color: #346605;
    font-weight: bold;
  }
  
  .text-h5 {
    font-size: 24px;
  }
  
  .text-h6 {
    font-size: 20px;
  }
  
  .text--secondary {
    color: #757575;
  }
  

  </style>
  