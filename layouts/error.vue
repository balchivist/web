<template>
  <div>
    <h2 v-if="error.statusCode == 404">Page not found</h2>
    <h2 v-else>An error has occurred</h2>
    <p>
      <NuxtLink to="/">Return to the homepage</NuxtLink>
    </p>
  </div>
</template>

<script>
export default {
  props: ['error'],
};
</script>

<style></style>
