<template>
  <div class="main">
    <!-- Header contains logo and application title -->
    <header class="header">
      <div class="header__left">
        <img src="./assets/uoc-logo.png" class="logo" alt="UOC Logo" />
        <span class="title">Post It Manager</span>
      </div>
    </header>
    <!-- Main content -->
    <div class="content">
      <!-- Components for search and filter functionality -->
      <SearchBar @show-form="toggleForm" @search="setSearchTerm" />
      <FilterBar
        @sort-items="setSortBy"
        @order-items="setOrderBy"
        @favourite-items="setFavouriteItems"
      />
      <!-- List display of Post-Its -->
      <main class="main">
        <PostItList
          :postItProp="postItListFiltered"
          @delete-postit="deletePostIt"
        />
      </main>
      <!-- Modal for adding a new Post-It, shown based on a boolean value -->
      <ModalLayer v-if="showModal" @close-modal="toggleForm">
        <!-- Slots for inserting custom header and body content into the modal -->
        <template v-slot:header> Add New Post-It </template>
        <template v-slot:body>
          <PostItForm @add-postit="addPostIt" />
        </template>
      </ModalLayer>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import FilterBar from "./components/FilterBar.vue";
import SearchBar from "./components/SearchBar.vue";
import PostItList from "./components/PostitList.vue";
import PostItForm from "./components/PostItForm.vue";
import ModalLayer from "./components/ModalLayer.vue";
import axios from "axios";

const apiEndpoint = ref("http://localhost:3000/postit");
const showModal = ref(false);
const searchTerm = ref("");
const sortBy = ref("");
const orderBy = ref("");
const favouriteItems = ref(false);
const postItList = ref([]);

const addPostIt = async (newPostIt) => {
  try {
    const payload = {
      id: newPostIt.id,
      title: newPostIt.title,
      date: newPostIt.date,
      time: newPostIt.time,
      labels: newPostIt.labels,
      content: newPostIt.content,
      imageUrl: newPostIt.imageUrl,
      priority: newPostIt.priority,
      dueDate: newPostIt.dueDate,
      dueTime: newPostIt.dueTime,
      featured: newPostIt.featured
    };

    // Add new Post-It to the API
    await axios.post('http://localhost:3000/postit', payload);

    const response = await axios.get('http://localhost:3000/board');
    postItList.value = response.data; 
  } catch (error) {
    console.error('Error adding Post-It:', error.response || error.message);
  }
};
const deletePostIt = (postItId) => {
  postItList.value = postItList.value.filter(
    (postIt) => postIt.id !== postItId
  );
};

const toggleForm = () => {
  showModal.value = !showModal.value;
};

const setSearchTerm = (term) => {
  searchTerm.value = term;
};

const setSortBy = (criteria) => {
  sortBy.value = criteria;
};

const setOrderBy = (order) => {
  orderBy.value = order;
};

const setFavouriteItems = (favourite) => {
  favouriteItems.value = favourite;
};

const postItListFiltered = ref([]);

watchEffect(() => {
  let filtered = postItList.value;

  if (searchTerm.value) {
    const lowerCaseSearchTerm = searchTerm.value.toLowerCase();
    filtered = filtered.filter(
      (postIt) =>
        postIt.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        postIt.content.toLowerCase().includes(lowerCaseSearchTerm) ||
        postIt.labels.some((label) =>
          label.toLowerCase().includes(lowerCaseSearchTerm)
        )
    );
  }

  if (favouriteItems.value) {
    filtered = filtered.filter((postIt) => postIt.featured);
  }

  if (sortBy.value) {
    filtered.sort((a, b) => {
      let comparison = 0;
      if (a[sortBy.value] < b[sortBy.value]) {
        comparison = -1;
      } else if (a[sortBy.value] > b[sortBy.value]) {
        comparison = 1;
      }
      return orderBy.value === "ascending" ? comparison : comparison * -1;
    });
  }

  postItListFiltered.value = filtered;
});
</script>

<style scoped>
body {
  padding: 0;
  margin: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
}

.header__left {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  margin-right: 10px;
}

.title {
  font-size: 24px;
  font-weight: 400;
}
</style>
