<template>
    <div>
      <!-- Include the ProductList component here -->
      <LoginPage />
    </div>
  </template>
  
  <script>
  // Import the ProductList component
  import LoginPage from '@/components/LoginPage.vue';

  
  export default {
    name: 'LoginView',
    components: {
      // Register the ProductList component
      LoginPage
    }
  }
  </script>
  
  <style scoped>
  /* Add scoped styles here if needed */
  </style>
  