<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/products">Books</router-link> | 
    <router-link v-if="isLoggedIn" to="/shoppingcart">My Shopping Cart</router-link> |
    <router-link v-if="!isLoggedIn" to="/login">Login</router-link> |
    <router-link v-if="!isLoggedIn" to="/register">Register</router-link> 
    <button v-if="isLoggedIn" @click="logout" class="logout">Logout</button>
  </nav>
  <router-view/>
</template>

<script>
export default {
  computed: {
    // kinukuha logged in value
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    }
  },
  methods: {
    // tinatawag logout action sa store/index.js
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.logout {
  background-color: #ff3333; 
  color: white; 
  border: none; 
  border-radius: 20px; 
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease; 
}

.logout:hover {
  background-color: #cc0000;
}

</style>
