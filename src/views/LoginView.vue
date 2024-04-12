<template>
  <div>
      <!-- Include the LoginPage component here -->
      <LoginPage />
  </div>
</template>

<script>
// Import the LoginPage component
import LoginPage from '@/components/LoginPage.vue';

export default {
  name: 'LoginView',
  components: {
      // Register the LoginPage component
      LoginPage
  }
}
</script>

<style scoped>
/* Add scoped styles here if needed */
</style>
