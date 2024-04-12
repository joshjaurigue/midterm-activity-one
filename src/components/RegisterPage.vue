<template>
  <div>
    <!-- Registration form -->
    <form class="register-form" @submit.prevent="register">
      <h2 class="register-header-text">Register Page</h2>
      <br>
      <div class="form-group">
        <!-- Username input -->
        <label for="username">Username:</label>
        <input type="text" v-model="username" placeholder="Enter username here">
      </div>
      <div class="form-group">
        <!-- Password input -->
        <label for="password">Password:</label>
        <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Enter password here">
      </div>
      <div class="form-group">
        <!-- Confirm Password input -->
        <label for="confirmPassword" class="label-confirm">Confirm Password:</label>
        <input :type="showPassword ? 'text' : 'password'" v-model="confirmPassword" placeholder="Confirm password here" class="confirm-password-input">
        <!-- Checkbox to toggle password visibility -->
        <button type="button" class="show-hide-button" @click="togglePasswordVisibility">
          {{ showPassword ? 'Hide' : 'Show' }}
        </button>
      </div>
      <!-- Register button -->
      <button type="submit" class="register-button">Register</button>
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
      // User input for confirming password
      confirmPassword: '',
      // Flag to toggle password visibility
      showPassword: false
    };
  },
  methods: {
    // Validate the entered data during registration and call the 'register' action in the store
    async register() {
      try {
        // Check if passwords match
        if (this.password !== this.confirmPassword) {
          throw new Error('Passwords do not match.');
        }
        // Attempt to register by dispatching 'register' action to the store
        await this.$store.dispatch('register', { username: this.username, password: this.password });
        // If registration is successful, alert and redirect to login page
        alert("Registered successfully! Now redirecting to Login page.");
        this.$router.push('/login');
      } catch (error) {
        // If registration fails, alert with error message
        alert('Registration failed: ' + error.message);
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
  }
};
</script>

<style scoped>
/* CSS styles */
.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px; 
}

.label-confirm {
  flex: 0 0 200px;
  font-weight: bold;
}

.confirm-password-input {
  flex: 1;
  margin-right: 20px; 
}

.show-hide-button {
  vertical-align: middle;
  margin-left: 10px; 
}

button {
  margin-bottom: 20px; 
  padding: 10px 20px; 
}

input {
  margin-bottom: 20px; 
  padding: 8px 5px; 
}

input {
  border-radius: 20px;
  font-size: 16px;
}

label {
  font-size: 16px;
  display: inline-block;
  width: 200px; 
  text-align: left;
}

.show-hide-button {
  margin-left: 10px;
  background-color: none;
  color: #474747;
  border: none;
  border-radius: 20px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.show-hide-button:hover {
  background-color: #999898;
}

.register-button {
  background-color: #41e54bd0;
  color: black;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.register-button:hover {
  background-color: #11ff41;
}

.register-form {
  padding: 20px;
  border-radius: 10px;
  width: fit-content;
  display: inline-block;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
}

.register-header-text {
  font-size: 30px;
}

</style>
