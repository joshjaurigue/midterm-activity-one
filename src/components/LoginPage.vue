<template>
  <div>
    <!-- Login form -->
    <form class="login-form" @submit.prevent="login">
      <div class="login-header">
        <h3 class="login-header-text">Log-in Page</h3>
      </div>
      <!-- Username input -->
      <div class="input-field">
        <label for="username" class="input-label">Username:</label>
        <input type="text" v-model="username" placeholder="Enter username here" class="input-box">
      </div>
      <br>
      <!-- Password input -->
      <div class="password-input">
        <div class="password-field">
          <label for="password" class="input-label">Password:</label>
          <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Enter password here" class="input-box">
          <!-- Toggle button to show/hide password -->
          <button type="button" class="show-hide-button" @click="togglePasswordVisibility">
            {{ showPassword ? 'Hide' : 'Show' }}
          </button>
        </div>
      </div>
      <br>
      <!-- Login button -->
      <button type="submit" class="login-button">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // User input for username
      username: '',
      // User input for password
      password: '',
      // Flag to toggle password visibility
      showPassword: false
    };
  },
  methods: {
    // Verify the entered credentials by calling the 'login' action in the store
    async login() {
      try {
        // Attempt to login by dispatching 'login' action to the store
        await this.$store.dispatch('login', { username: this.username, password: this.password });
        // If login is successful, alert and redirect to home page
        alert("Logged in successfully.");
        this.$router.push('/');
      } catch (error) {
        // If login fails, alert with error message
        alert('Login failed: ' + error.message);
      }
    },
    // Method to toggle password visibility
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
  }
};
</script>

<style scoped>
.button,
input {
  margin-bottom: 10px;
  padding: 8px 12px;
}

.login-header-text {
  color: #333;
}

.input-field,
.password-field {
  display: flex;
  align-items: center;
}

.input-label {
  margin-right: 10px;
  font-size: 16px;
}

.input-box {
  flex: 1;
  padding-right: 30px;
  border: 1px solid #ccc;
  border-radius: 20px; 
}

.password-field .show-hide-button {
  margin-left: 10px;
  background-color: none;
  color: #474747;
  border: none;
  border-radius: 20px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.password-field .show-hide-button:hover {
  background-color: #999898;
}

.login-button {
  background-color: #41e54bd0;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #11ff41;
}

.login-form {
  padding: 20px;
  border-radius: 10px;
  width: fit-content;
  display: inline-block;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
}

.login-header {
  text-align: center;
  margin-bottom: 20px;
}

.login-header-text {
  font-size: 24px;
}
</style>
