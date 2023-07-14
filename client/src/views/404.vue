<template>
    <div class="not-found">
      <h1>404 - Page non trouvée</h1>
      <img src="../../public/404.jpg" alt="Image 404">
      <p>Désolé, la page que vous recherchez n'a pas été trouvée.</p>
      <router-link to="/">Retour à la page d'accueil</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: "NotFound",
  };
  </script>
 
<style scoped>
.not-found {
  text-align: center;
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

img {
  width: 200px; /* Ajuste la taille de l'image selon tes besoins */
  margin-bottom: 20px;
}

p {
  font-size: 16px;
  margin-bottom: 20px;
}

router-link {
  color: blue;
}
</style>