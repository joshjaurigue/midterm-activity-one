<template>
  <div>
    <!-- Include the RegisterPage component here -->
    <RegisterPage />
  </div>
</template>

<script>
// Import the RegisterPage component
import RegisterPage from '@/components/RegisterPage.vue';

export default {
  name: 'RegisterView',
  components: {
      // Register the RegisterPage component
      RegisterPage
  }
}
</script>

<style scoped>
/* Add scoped styles here if needed */
</style>
