import { createStore } from 'vuex';

export default createStore({
  // Book array
  state: {
    books: [
      { id: '101', title: 'The Hunger Games', author: 'Suzanne Collins', genre: 'Young Adult Contemporary Fiction', price: 599.95 },
      { id: '102', title: 'The Hunger Games: Catching Fire', author: 'Suzanne Collins', genre: 'Young Adult Contemporary Fiction', price: 659.95 },
      { id: '103', title: 'The Hunger Games: Mockingjay', author: 'Suzanne Collins', genre: 'Young Adult Contemporary Fiction', price: 700.95 },
      {id: '104', title: 'Harry Potter and The Sorcerer\'s Stone', author: 'J.K Rowling', genre: 'Fantasy/Magic', price: 790.95},
      {id: '105', title: 'Harry Potter and The Chamber of Secrets', author: 'J.K. Rowling', genre: 'Fantasy/Magic', price: 721.95},
      {id: '106', title: 'Harry Potter and The Prisoner of Azkaban', author: 'J.K. Rowling ', genre: 'Fantasy/Magic', price: 700.35},
      {id: '107', title: 'Harry Potter and The Goblet of Fire', author: 'J.K. Rowling', genre: 'Fantasy/Magic', price: 751.35},
      {id: '108', title: 'Divergent', author: 'Veronica Roth', genre: 'Young Adult Science Fiction', price: 800.95},
      {id: '109', title: 'Insurgent', author: 'Veronica Roth', genre: 'Young Adult Science Fiction', price: 850.95},
      {id: '110', title: 'Allegiant', author: 'Veronica Roth', genre: 'Young Adult Science Fiction', price: 825.95},
      {id: '111', title: 'Mindset: The New Psychology of Success', author: 'Carol S. Dweck', genre: 'Education', price: 1099.00},
      {id: '112', title: 'Educated', author: 'Tara Westover', genre: 'Education', price: 999.00},
      {id: '113', title: 'Outliers: The Story of Success', author: 'Malcolm Gladwell', genre: 'Education', price: 899.95},
      {id: '114', title: 'The Hunger Games: Catching Fire', author: 'Suzanne Collins', genre: 'Young Adult Contemporary Fiction', price: 659.95},
      {id: '115', title: 'ABNKKBSNPLAKo? (Mga Kwentong Chalk ni Bob Ong', author: 'Bob Ong', genre: 'Humor', price: 459.00},
      {id: '116', title: 'Noli Me Tangere', author: 'Jose P. Rizal', genre: 'History/Fiction', price: 1599.00},
      {id: '117', title: 'Dekada \'70', author: 'Lualhati Bautista', genre: 'History', price: 999.00},
      {id: '118', title: 'Today Tonight Tomorrow', author: 'Rachel Lynn Solomon', genre: 'Romance', price: 699.00},
      {id: '119', title: 'If You Could See the Sun', author: 'Ann Liang', genre: 'Romance', price: 659.95},
      {id: '120', title: 'Not Here to Be Liked', author: 'Michelle Quach', genre: 'Romance', price: 559.95}
    ],
    shoppingCart: [],
    searchQuery: '',
    isLoggedIn: false,
    users: []
  },
  getters: {
    // Get book products with formatted price
    bookProducts: state => {
      return state.books.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        price: 'Php ' + book.price.toFixed(2),
        quantity: 1,
      }));
    },
    // Get shopping cart items with subtotal
    shoppingCartItems: state => {
      return state.shoppingCart.map(item => ({
        ...item,
        subtotal: item.price * item.quantity, // Add a subtotal field
      }));
    },
    // Calculate total price of items in shopping cart
    totalPrice: (_, getters) => {
      const subtotal = getters.shoppingCartItems.reduce((total, item) => total + item.subtotal, 0);
      // Format to two decimal places
      return subtotal.toFixed(2);
    },
    // Filter book products based on search query
    filteredBookProducts: state => {
      const query = state.searchQuery.toLowerCase();
      if (query.trim() === '') {
        return state.books.map(book => ({
          id: book.id,
          title: book.title,
          author: book.author,
          genre: book.genre,
          price: 'Php ' + book.price.toFixed(2),
          quantity: 1,
        }));
      } else {
        return state.books.filter(book =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.genre.toLowerCase().includes(query)
        );
      }
    }
  },
  mutations: {
    // Add a book to the shopping cart
    addToCart(state, bookId) {
      const existingBookIndex = state.shoppingCart.findIndex(book => book.id === bookId);
      // Check if book already exists
      if (existingBookIndex !== -1) {
        state.shoppingCart[existingBookIndex].quantity++;
        alert("Added to cart!");
      } else {
        const bookToAdd = state.books.find(book => book.id === bookId);
        state.shoppingCart.push({ ...bookToAdd, quantity: 1 });
        alert("Added to cart!");
      }
    },
    // Decrease quantity of a book in the shopping cart
    decreaseQuantity(state, bookId) {
      const book = state.shoppingCart.find(book => book.id === bookId);
      if (book && book.quantity > 1) {
        book.quantity--;
      }
    },
    // Increase quantity of a book in the shopping cart
    increaseQuantity(state, bookId) {
      const book = state.shoppingCart.find(book => book.id === bookId);
      if (book) {
        book.quantity++;
      }
    },
    // Remove a book from the shopping cart
    removeFromCart(state, bookId) {
      // Check if the selected product exists, then remove it
      const index = state.shoppingCart.findIndex(book => book.id === bookId);
      if (index !== -1) {
        state.shoppingCart.splice(index, 1);
        alert("Removed from cart!");
      }
    },
    // Remove all items from the shopping cart
    removeAllFromCart(state) {
      state.shoppingCart = [];
      alert("Removed all items successfully.");
    },
    // Set search query for filtering book products
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
    // Purchase items in the shopping cart
    purchase(state) {
      state.shoppingCart = [];
    },
    // Reset search query
    resetSearchQuery(state) {
      state.searchQuery = '';
    },
    // Log in user
    login(state) {
      state.isLoggedIn = true;
    },
    // Log out user
    logout(state) {
      state.isLoggedIn = false;
    },
    // Register new user
    register(state, userData) {
      const existingUser = state.users.find(user => user.username === userData.username);
      if (existingUser) {
        throw new Error('Username already exists. Please choose a different username.');
      } else if (!userData.username.trim() || !userData.password.trim()) {
        throw new Error('Invalid username or password. Please try again');
      } else {
        state.users.push(userData);
      }
    }
  },
  actions: {
    // Check login credentials
    async login({ commit, state }, userData) {
      const user = state.users.find(user => user.username === userData.username && user.password === userData.password);
      if (user) {
        // Call login mutation if credentials match
        commit('login');
      } else if (userData.username == null || userData.password == null) {
        // Error validation
        throw new Error('Invalid username or password. Please try again');
      } else {
        throw new Error('Invalid username or password.');
      }
    },
    async logout({ commit }) {
      // Call logout mutation
      commit('logout');
    },
    async register({ commit }, userData) {
      // Call register mutation
      commit('register', userData);
    },
    async purchase({ commit }) {
      // Call purchase mutation
      commit('purchase');
    },
  },
  modules: {}
});
