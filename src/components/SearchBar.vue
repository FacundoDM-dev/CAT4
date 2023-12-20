<template>
  <!-- Search bar with input and action buttons -->
  <div class="search-bar">
    <!-- Text input for search functionality -->
    <input
      type="text"
      placeholder="Search Post-It"
      v-model="searchTerm"
      @input="search"
    />
    <!-- Button to clear the search input -->
    <button class="clear" @click="clearSearch">Clear</button>
    <!-- Button to trigger modal for adding a new Post-It -->
    <button class="add" @click="showForm">Add Post-It</button>
  </div>
</template>

<script setup>
// Import the ref function from Vue
import { ref } from "vue";

const emit = defineEmits(["search", "show-form"]);

// Define the reactive property searchTerm
const searchTerm = ref("");

// Define the method to emit the "show-form" event
const showForm = () => {
  emit("show-form");
};

// Define the method to clear the search input
const clearSearch = () => {
  searchTerm.value = "";
};

// Define the method to emit the "search" event with the searchTerm
const search = () => {
  emit("search", searchTerm.value);
};
</script>

<style scoped>
.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
}
.search-bar input {
  width: 100%;
  padding: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  outline: none;
}
.search-bar button {
  padding: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  min-width: 100px;
}
.search-bar .clear {
  margin-right: 10px;
}
.search-bar .add {
  background-color: #4caf50;
  color: #fff;
}
</style>
