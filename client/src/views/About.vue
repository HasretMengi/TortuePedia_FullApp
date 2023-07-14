<template>
  <div>
    <h2 class="text-center mt-4">Liste des utilisateurs</h2>
    <v-container>
      <v-row justify="center">
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="user in users"
          :key="user._id"
        >
          <v-card>
            <v-card-title > <v-icon left>mdi-account</v-icon>{{ user.username }}</v-card-title>
            <v-card-text>
              <strong>Courriel:</strong> {{ user.email }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import API from "../api";

export default {
  data() {
    return {
      users: [],
    };
  },
  async created() {
    try {
      this.users = await API.getAllUsers();
    } catch (error) {
      console.error(error);
    }
  },
};
</script>