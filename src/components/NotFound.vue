<template>
    <div class="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, we couldn’t find the page you’re looking for.</p>
      <router-link to="/">Go back home</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound'
  }
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    margin-top: 4rem;
  }
  .not-found h1 {
    font-size: 3rem;
  }
  .not-found p {
    margin: 1rem 0;
  }
  </style>
  