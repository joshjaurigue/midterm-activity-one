<template>
    <div>
        <h1>Welcome to Aklatan!</h1>
        <input type="text" v-model="searchQuery" placeholder="Search here">
        <button @click="search" class="button-search">Search</button>
        <button @click="resetSearch" class="button-clear">Clear</button>
        <br>
        <!--Table contents-->
        <table>
            <thead>
                <tr>
                    <th>Book ID</th>
                    <th>Book Title</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>Price</th>
                    <th>Action</th> <!-- Added Action column -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="book in displayBooks" :key="book.id">
                    <td>{{ book.id }}</td>
                    <td>{{ book.title }}</td>
                    <td>{{ book.author }}</td>
                    <td>{{ book.genre }}</td>
                    <td>{{ book.price }}</td>
                    <td><button @click="addToCart(book)">Add To Cart</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        computed: {
            // kinukuha yung books sa store
            bookProducts() {
                return this.$store.getters.bookProducts
            },
            // kinukuha yung filtered books sa store
            filteredBookProducts() {
                return this.$store.getters.filteredBookProducts;
            },
            // chinecheck kung nakalogin
            isLoggedIn() {
                return this.$store.state.isLoggedIn;
            },
            // didisplay depende kung wala bang sinearch or di existing product
            displayBooks() {
                return this.searchQuery.trim() === '' || this.filteredBookProducts.length === 0
                    ? this.bookProducts
                    : this.filteredBookProducts;
            },
        },
        data() {
            return {
                searchQuery: ''
            };
        },
        methods: {
            // pang add
            addToCart(book) {
                if (!this.isLoggedIn) {
                    alert('Please log in first to add to cart.');
                    return;
                }
                this.$store.commit('addToCart', book.id);
            },
            // pang search
            search() {
                this.$store.commit('setSearchQuery', this.searchQuery);
                // Check if any products match the search query
                if (this.filteredBookProducts.length === 0) {
                    alert('No matching products found.');
                } else if (this.searchQuery == '') {
                    alert('Invalid keyword. Please try again.');
                }
            },
            // pang reset
            resetSearch() {
                this.$store.commit('resetSearchQuery');
                this.searchQuery = ''; // Reset the input field
            },
        }
    }
</script>

<style scoped>
/* CSS styles */
h1 {
    color: #333;
    font-size: 24px;
    margin-bottom: 20px;
}

input[type="text"] {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 20px;
    margin-bottom: 10px;
}

.button-search {
    padding: 8px 16px;
    font-size: 16px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    background-color: #4892e1;
    color: #fff;
    margin-left: 10px
    
}
.button-clear {
    padding: 8px 16px;
    font-size: 16px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    background-color: #c24848;
    color: #fff;
    margin-left: 10px
    
}

.button-search:hover {
    background-color: #0057b3;
}
.button-clear:hover {
    background-color: #ff0c0c;
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

td button {
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 20px;
    padding: 5px 10px;
    cursor: pointer;
}

td button:hover {
    background-color: #218838;
}

h1 {
    color: #333;
    font-size: 24px;
    margin-bottom: 20px;
}

input[type="text"] {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 20px;
    margin-bottom: 10px;
}

.button-search {
    padding: 8px 16px;
    font-size: 16px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    background-color: #4892e1;
    color: #fff;
    margin-left: 10px
    
}
.button-clear {
    padding: 8px 16px;
    font-size: 16px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    background-color: #c24848;
    color: #fff;
    margin-left: 10px
    
}

.button-search:hover {
    background-color: #0057b3;
}
.button-clear:hover {
    background-color: #ff0c0c;
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

td button {
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 20px;
    padding: 5px 10px;
    cursor: pointer;
}

td button:hover {
    background-color: #218838;
}

</style>
