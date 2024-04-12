<template>
  <div>
    <!-- Display shopping cart if user is logged in -->
    <div v-if="isLoggedIn" class="shopping-cart">
      <h1>Your Shopping Cart</h1>
      <!-- Check if there are items in the shopping cart -->
      <template v-if="shoppingCartItems.length > 0">
        <!-- Table for displaying shopping cart items -->
        <table>
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Subtotal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <!-- Display each item in the shopping cart -->
            <tr v-for="item in shoppingCartItems" :key="item.id">
              <td>{{ item.title }}</td>
              <td>
                <!-- Button to decrease quantity -->
                <button @click="decreaseQuantity(item)" class="quantity-button">-</button>
                {{ item.quantity }}
                <!-- Button to increase quantity -->
                <button @click="increaseQuantity(item)" class="quantity-button">+</button>
              </td>
              <td>{{ item.price }}</td>
              <td>Php {{ item.subtotal.toFixed(2) }}</td>
              <!-- Button to remove item from cart -->
              <td><button @click="removeFromCart(item.id)" class="remove-button">Remove From Cart</button></td>
            </tr>
          </tbody>
        </table>
        <!-- Total price of items in the cart -->
        <h3 class="price text-start">Total Price: Php {{ totalPrice }}</h3>
        <!-- Button to remove all items from cart -->
        <button @click="removeAllFromCart" class="action-button-remove-all">Remove All</button>
        <!-- Button to proceed with the purchase -->
        <button @click="purchase" class="action-button-order">Order</button>
      </template>
      <!-- If cart is empty -->
      <template v-else>
        <p>No items in the cart yet.</p>
      </template>
    </div>
    <!-- If user is not logged in -->
    <div v-else>
      <!-- Display login prompt or redirect to login page -->
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    // Check if user is logged in
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    // Get shopping cart items
    shoppingCartItems() {
      const items = this.$store.getters.shoppingCartItems;
      console.log("Shopping Cart Items:", items); // Log the shopping cart items
      return items;
    },
    // Calculate total price of items in the cart
    totalPrice() {
      return this.$store.getters.totalPrice;
    }
  },
  methods: {
    // Method for purchase
    async purchase() {
      // Check if cart is empty before proceeding with purchase
      if (this.shoppingCartItems.length === 0) {
        alert('Your cart is empty. Please add items before ordering.');
        return;
      }
      // Dispatching from the 'purchase' action to the store/index
      try {
        await this.$store.dispatch('purchase');
        alert('Purchase completed successfully!');
      } catch (error) {
        alert('Failed to complete purchase: ' + error.message);
      }
    },
    // Method to remove item from cart
    removeFromCart(bookId) {
      
      this.$store.commit('removeFromCart', bookId);
    },
    // Method to remove all items from cart
    removeAllFromCart() {

      this.$store.commit('removeAllFromCart');
    },
    // Method to decrease quantity of an item in the cart
    decreaseQuantity(item) {
     
      this.$store.commit('decreaseQuantity', item.id);
    },
    // Method to increase quantity of an item in the cart
    increaseQuantity(item) {
     
      this.$store.commit('increaseQuantity', item.id);
    }
  }
};
</script>

<style scoped>
/* CSS styles */
.price {
  font-weight: bold;
  text-align: left;
}
.shopping-cart {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.quantity-button {
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin: 0 5px;
}

.quantity-button:hover {
  background-color: #0056b3;
}

.remove-button {
  padding: 5px 10px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #bd2130;
}

.action-button-remove-all {
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  background-color: #0e4c8d;
  color: #fff;
  margin-top: 10px;
  margin-left: 10px;
}

.action-button-remove-all:hover {
  background-color: #007bff;
}

.action-button-order {
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  background-color: #0dd338;
  color: #fff;
  margin-top: 10px;
  margin-left: 10px;
}

.action-button-order:hover {
  background-color: #00ff44;
}

</style>
