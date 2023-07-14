<template>
    <v-container>
      
      <v-row no-gutters>
        <v-col sm="10" class="mx-auto">
          <v-card class="pa-5">
            <v-card-title>
              Modifier cette Tortue
            </v-card-title>
            <v-divider></v-divider>
            <v-form ref="form" @submit.prevent="updateForm" class="pa-5" enctype="multipart/form-data">
              <v-text-field label="Nom" v-model="tortue.nom" :rules="rules"></v-text-field>
              <v-text-field label="Nom Latin" v-model="tortue.nomLatin" :rules="rules"></v-text-field>
              <v-text-field label="Espece" v-model="tortue.espece" :rules="rules"></v-text-field>
              <v-text-field label="Vitesse" v-model="tortue.vitesse" :rules="rules"></v-text-field>
              <v-text-field label="Habitat" v-model="tortue.habitat" :rules="rules"></v-text-field>
              <v-text-field label="Alimentation" v-model="tortue.alimentation" :rules="rules"></v-text-field>
              <v-text-field label="Age Maximal" v-model="tortue.ageMax" :rules="rules"></v-text-field>
              <v-file-input @change="selectFile" show-size counter multiple label="Select Image"></v-file-input>
              <v-img :src="`/${tortue.image}`" width="20%"></v-img>
              <v-btn type="submit" class="mt-3" color="success" text>modifier Tortue</v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import API from '../api';
  
  
  export default {
    
    data() {
      return {
        drawer: null,
        rules: [value => {
          if (value) return true;
          return 'Ce champ est obligatoire !';
        }],
        tortue: {
          nom: "",
          nomLatin: "",
          espece: "",
          vitesse: 0,
          habitat: "",
          alimentation: "",
          ageMax: 0,
          image: ""
        },
        image: ""
      };
    },
    async created() {
      const res = await API.getTortueById(this.$route.params.id);
      this.tortue = res;
    },
    methods: {
      selectFile(file) {
        this.image = file[0];
      },
      async updateForm() {
        const formData = new FormData();
        formData.append('image', this.image);
        formData.append('nom', this.tortue.nom);
        formData.append('nomLatin', this.tortue.nomLatin);
        formData.append('espece', this.tortue.espece);
        formData.append('vitesse', this.tortue.vitesse);
        formData.append('habitat', this.tortue.habitat);
        formData.append('alimentation', this.tortue.alimentation);
        formData.append('ageMax', this.tortue.ageMax);
        formData.append('oldImage', this.tortue.image);
        if (this.$refs.form.validate()) {
          const res = await API.updateTortue(this.$route.params.id, formData);
          this.$router.push({ name: 'home', params: { message: res.message } });
        }
      }
    }
  };
  </script>
  