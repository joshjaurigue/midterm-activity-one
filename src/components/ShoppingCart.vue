<template>
  <div>
    <div v-if="isLoggedIn" class="shopping-cart">
      <h1>Your Shopping Cart</h1>
      <template v-if="shoppingCartItems.length > 0">
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
            <tr v-for="item in shoppingCartItems" :key="item.id">
              <td>{{ item.title }}</td>
              <td>
                <button @click="decreaseQuantity(item)" class="quantity-button">-</button>
                {{ item.quantity }}
                <button @click="increaseQuantity(item)" class="quantity-button">+</button>
              </td>
              <td>{{ item.price }}</td>
              <td>Php {{ item.subtotal.toFixed(2) }}</td>
              <td><button @click="removeFromCart(item.id)" class="remove-button">Remove From Cart</button></td>
            </tr>
          </tbody>
        </table>
        <h3 class="price text-start">Total Price: Php {{ totalPrice }}</h3>
        <button @click="removeAllFromCart" class="action-button-remove-all">Remove All</button>
        <button @click="purchase" class="action-button-order">Order</button>
      </template>
      <template v-else>
        <p>No items in the cart yet.</p>
      </template>
    </div>
    <div v-else>
      <!-- Display login prompt or redirect to login page -->
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    shoppingCartItems() {
      const items = this.$store.getters.shoppingCartItems;
      console.log("Shopping Cart Items:", items); // Log the shopping cart items
      return items;
    },
    totalPrice() {
      return this.$store.getters.totalPrice;
    }
  },
  methods: {
    // for purchase
    async purchase() {
      // check kung empty ba cart or not pag nagorder
      if (this.shoppingCartItems.length === 0) {
        alert('Your cart is empty. Please add items before ordering.');
        return;
      }
     // dinidispatch from action purchase sa store/index
      try {
        await this.$store.dispatch('purchase');
        alert('Purchase completed successfully!');
      } catch (error) {
        alert('Failed to complete purchase: ' + error.message);
      }
    },
    removeFromCart(bookId) {
      
      this.$store.commit('removeFromCart', bookId);
    },
    removeAllFromCart() {

      this.$store.commit('removeAllFromCart');
    },
    decreaseQuantity(item) {
     
      this.$store.commit('decreaseQuantity', item.id);
    },
    increaseQuantity(item) {
     
      this.$store.commit('increaseQuantity', item.id);
    }
  }
};
</script>

<style scoped>
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
 