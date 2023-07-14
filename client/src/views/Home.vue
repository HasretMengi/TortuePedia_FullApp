<template>
  <v-app id="inspire">
   
    <v-main>
      <v-container>
        <v-alert border="left" close-text="Close Alert" color="green accent-4" dark dismissible v-if="$route.params.message">
          {{ $route.params.message }}
        </v-alert>
        <v-row no-gutters>
          <v-col sm="4" class="pa-3" v-for="tortue in tortues" :key="tortue._id">
            <v-card class="pa-1" :to="{ name: 'tortue-detail', params: { id: tortue._id } }">
              <v-img height="250" :src="`/${tortue.image}`"></v-img>
              <v-btn class="ml-4 mt-3 mb-3" small outlined color="" indigo>
                {{ tortue.nom }}
              </v-btn>
              <v-card-text class="py-0">
                <p>Plus de détail ..</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import API from '../api.js';


export default {

  data() {
    return {
      drawer: null,
      tortues: []
    };
  },
  async created() {
    this.tortues = await API.getAllTortues();
  }
};
</script>
