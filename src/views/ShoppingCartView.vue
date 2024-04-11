<template>
  <div>
    <!-- Include the ProductList component here -->
    <ShoppingCart />
  </div>
</template>

<script>
// Import the ProductList component
import ShoppingCart from '@/components/ShoppingCart.vue'

export default {
  name: 'ShoppingCartView',
  components: {
    // Register the ProductList component
    ShoppingCart
  }
}
</script>

<style scoped>
/* Add scoped styles here if needed */
</style>
