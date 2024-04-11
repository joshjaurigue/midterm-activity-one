<template>
  <div>
    <!-- Include the ProductList component here -->
    <ProductList />
  </div>
</template>

<script>
// Import the ProductList component
import ProductList from '@/components/ProductList.vue'

export default {
  name: 'ProductListView',
  components: {
    // Register the ProductList component
    ProductList
  }
}
</script>

<style scoped>
/* Add scoped styles here if needed */
</style>
