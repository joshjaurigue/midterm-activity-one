import { createStore } from 'vuex'

export default createStore({
  // book array
  state: {
      books: [
        {id: '101', title: 'The Hunger Games',   author: 'Suzanne Collins', genre: 'Young Adult Contemporary Fiction', price: 599.95},
        {id: '102', title: 'The Hunger Games: Catching Fire', author: 'Suzanne Collins', genre: 'Young Adult Contemporary Fiction', price: 659.95},
        {id: '103', title: 'The Hunger Games: Mockingjay', author: 'Suzanne Collins', genre: 'Young Adult Contemporary Fiction', price: 700.95},
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
    shoppingCartItems: state => {
      return state.shoppingCart.map(item => ({
        ...item,
        subtotal: item.price * item.quantity, // Add a subtotal field
      }));
    },
    totalPrice: (_, getters) => {
      const subtotal = getters.shoppingCartItems.reduce((total, item) => total + item.subtotal, 0);
      // pang two decimals
      return subtotal.toFixed(2); 
    },
    // chinecheck kung empty ba or di existing yung searched product
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
    addToCart(state, bookId) {
            const existingBookIndex = state.shoppingCart.findIndex(book => book.id === bookId);
      // chinecheck kung existing o hindi
      if (existingBookIndex !== -1) {
        
        state.shoppingCart[existingBookIndex].quantity++;
        alert("Added to cart!");
      } else {
   
        const bookToAdd = state.books.find(book => book.id === bookId);
        state.shoppingCart.push({ ...bookToAdd, quantity: 1 });
        alert("Added to cart!");
      }
    },
  
    decreaseQuantity(state, bookId) {
      const book = state.shoppingCart.find(book => book.id === bookId);
      if (book && book.quantity > 1) {
        book.quantity--; 
      }
    },
  
    increaseQuantity(state, bookId) {
      const book = state.shoppingCart.find(book => book.id === bookId);
      if (book) {
        book.quantity++; 
      }
    },
    removeFromCart(state, bookId) {
      // chinecheck yung selected product tapos ireremove
      const index = state.shoppingCart.findIndex(book => book.id === bookId);
      if (index !== -1) {
        
        state.shoppingCart.splice(index, 1);
        alert("Removed from cart!");
      }
    },
  
    removeAllFromCart(state) {
     
      state.shoppingCart = [];
      alert("Removed all items successfully.");
    },
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
    purchase(state) {
     
      state.shoppingCart = [];
    },
    resetSearchQuery(state) {
      state.searchQuery = '';
    },
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    
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
    // chinecheck yung login credentials
    async login({ commit, state }, userData) {
      const user = state.users.find(user => user.username === userData.username && user.password === userData.password);
      if (user) {
       // if matching credential, tatawagin login mutation
        commit('login');
        // error validation
      } else if ( userData.username == null || userData.password == null) {
        throw new Error('Invaild username or password. Please try again');
      } 
      else {
        throw new Error('Invalid username or password.');
      }
    },
    async logout({ commit }) {
      
      commit('logout');
    },
    async register({ commit}, userData) {
      commit('register', userData);
    },
    async purchase({ commit }) {
      commit('purchase');
    },

  },
  modules: {
  }
})
