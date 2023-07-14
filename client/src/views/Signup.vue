<template>
    <v-container>
        <v-card class="mx-auto" style="max-width: 500px;">
            <v-toolbar color="green dark-4" cards flat>
                <v-card-title class="text-h6 font-weight-regular">
                    Sign up
                </v-card-title>
            </v-toolbar>
            <span v-if="message" class="message" style="display: block; text-align: center; margin-top: 1rem;">{{ message }}</span>


            <v-form ref="form" @submit.prevent="submitForm" class="pa-4 pt-6">
                <v-text-field v-model="user.username" filled color="deep-green" label="User name"></v-text-field>
                

                <v-text-field v-model="user.email" :rules="[rules.email]" filled color="deep-green" label="Email address"
                    type="email"></v-text-field>
              

                <v-text-field v-model="user.password" :rules="[rules.password, rules.length(8)]" filled color="deep-green"
                    counter="8" label="Password" style="min-height: 96px" type="password"></v-text-field>
                <v-divider></v-divider>
                <v-spacer></v-spacer>
                <v-btn type="submit" class="black--text" color="green dark-4" depressed>
                    Submit
                </v-btn>
            </v-form>
            
        </v-card>
    </v-container>
</template>
  

  
  <script>
  import API from '../api';
  
  export default {
    data() {
            return {
                rules: {
                email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
                length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
                password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) || 'Password must contain an upper case letter, a numeric character, and a special character',
                required: v => !!v || 'This field is required',
            },
        user: {
          username: '',
          email: '',
          password: '',
        },
        message: '',
      };
    },
    methods: {
      async submitForm() {
        try {
          const res = await API.signup(this.user);
          this.message = res.message;
          this.$refs.form.reset();
        } catch (error) {
          if (error.response && error.response.data && error.response.data.error) {
            this.message = error.response.data.error;
          } else {
            console.error(error);
          }
        }
      },
    },
  };
  </script>
  
  <style>
  .message {
    color: black;
  }
  </style>
  