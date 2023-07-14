<template>
    <v-app>
      
      <v-main>
        <v-container>
          <v-row no-gutters>
            <v-col sm="10" class="mx-auto">
              <v-card class="pa-5">
                <v-card-title>
                  Ajouter nouvelle Tortue
                </v-card-title>
                <v-divider></v-divider>
                <v-form ref="form" @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">
                  <v-text-field label="Nom" v-model="tortue.nom" filled color="deep-green" ></v-text-field>
                  <v-text-field label="Nom Latin" v-model="tortue.nomLatin" filled color="deep-green" ></v-text-field>
                  <v-text-field label="Espece" v-model="tortue.espece" filled color="deep-green" ></v-text-field>
                  <v-text-field label="Vitesse" v-model="tortue.vitesse" filled color="deep-green" ></v-text-field>
                  <v-text-field label="Habitat" v-model="tortue.habitat" filled color="deep-green" ></v-text-field>
                  <v-text-field label="Alimentation" v-model="tortue.alimentation" filled color="deep-green" ></v-text-field>
                  <v-text-field label="Age Maximal" v-model="tortue.ageMax" filled color="deep-green" ></v-text-field>
                  <v-file-input @change="selectFile" show-size counter multiple label="Select Image" filled color="deep-green" ></v-file-input>
                  <v-btn type="submit" class="mt-3" color="green dark-4">Ajouter Tortue</v-btn>
                </v-form>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
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
    methods: {
      selectFile(file) {
        this.image = file[0];
      },
      async submitForm() {
        const formData = new FormData();
        formData.append('image', this.image);
        formData.append('nom', this.tortue.nom);
        formData.append('nomLatin', this.tortue.nomLatin);
        formData.append('espece', this.tortue.espece);
        formData.append('vitesse', this.tortue.vitesse);
        formData.append('habitat', this.tortue.habitat);
        formData.append('alimentation', this.tortue.alimentation);
        formData.append('ageMax', this.tortue.ageMax);
        if (this.$refs.form.validate()) {
          const res = await API.createTortue(formData);
          this.$router.push({ name: 'home', params: { message: res.message } });
        }
      }
    }
  };
  </script>
  