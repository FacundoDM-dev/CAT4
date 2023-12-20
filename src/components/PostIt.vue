<template>
  <!-- Post-it note with dynamic 'featured' class -->
  <div :class="['postit', { featured }]">
    <!-- Button to delete the Post-it -->
    <button class="delete-postit" @click="deletePostIt">
      <img src="../assets/delete-button.svg" alt="Delete Icon" />
    </button>
    <!-- Title of the Post-it note -->
    <h2 class="postit-title">{{ props.title }}</h2>
    <!-- Image associated with the Post-it note -->
    <div class="postit-image">
      <img :src="props.imageUrl" alt="Post-It Image" />
    </div>
    <!-- Container for Post-it metadata -->
    <div class="postit-info">
      <!-- Display date with icon -->
      <div class="postit-date">
        <img src="../assets/date.svg" alt="Date Icon" />
        <span>{{ props.date }}</span>
      </div>
      <!-- Display time with icon -->
      <div class="postit-time">
        <img src="../assets/time.svg" alt="Time Icon" />
        <span>{{ props.time }}</span>
      </div>
      <!-- Display priority level -->
      <div class="postit-priority">
        <span class="priority" :class="[props.priority]">{{ props.priority }}</span>
      </div>
      <!-- Display due date with icon -->
      <div class="postit-due-date">
        <img src="../assets/due-date.svg" alt="Due Date Icon" />
        <span>{{ props.dueDate }}</span>
      </div>
      <!-- Main content of the Post-it note -->
      <div class="postit-content">{{ props.content }}</div>
      <!-- Labels for the Post-it note -->
      <div class="postit-labels">
        <span v-for="label in props.labels" :key="label" class="label">
          {{ label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>

const emit = defineEmits(['delete-postit'])

const props = defineProps([
  'id',
  'title',
  'imageUrl',
  'date',
  'time',
  'dueDate',
  'dueTime',
  'priority',
  'content',
  'labels',
  'featured',
]);

const deletePostIt = () => {
  emit('delete-postit', props.id);
};
</script> 


<style scoped>
.postit {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  position: relative;
  margin: 20px;
}
.postit-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}
.postit-image {
  margin: 1rem 0;
}

.postit-image img {
  width: 350px;
}
.postit-info {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  margin: 1rem 0;
}
.postit-date,
.postit-time,
.postit-priority,
.postit-due-date {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 50%;
  margin-bottom: 0.5rem;
}
.postit-date i,
.postit-time i,
.postit-due-date i {
  width: 1rem;
  margin-right: 0.5rem;
}
.postit-date span,
.postit-time span,
.postit-due-date span {
  font-size: 0.8rem;
}
.priority {
  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.priority.low {
  background-color: #f2c94c;
}
.priority.medium {
  background-color: #f2994a;
}
.priority.high {
  background-color: #eb5757;
}
.postit-content {
  margin: 1rem 0;
  text-align: left;
}
.postit-labels {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  margin: 1rem 0;
}
.postit-labels .label {
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
}
.delete-postit {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
}
.delete-postit img {
  width: 20px;
}
</style>
