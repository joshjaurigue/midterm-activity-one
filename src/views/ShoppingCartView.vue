<template>
  <div>
    <!-- Include the ShoppingCart component here -->
    <ShoppingCart />
  </div>
</template>

<script>
// Import the ShoppingCart component
import ShoppingCart from '@/components/ShoppingCart.vue'

export default {
  name: 'ShoppingCartView',
  components: {
    // Register the ShoppingCart component
    ShoppingCart
  }
}
</script>

<style scoped>
/* Add scoped styles here if needed */
</style>
