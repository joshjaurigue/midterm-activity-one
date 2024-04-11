<template>
    <div>
      <!-- Include the ProductList component here -->
      <RegisterPage />
    </div>
  </template>
  
  <script>
  // Import the ProductList component
  import RegisterPage from '@/components/RegisterPage.vue';

  
  export default {
    name: 'RegivterView',
    components: {
      // Register the ProductList component
      RegisterPage
    }
  }
  </script>
  
  <style scoped>
  /* Add scoped styles here if needed */
  </style>
  