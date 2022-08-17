<template>
  <div>
    <b-jumbotron
      :header="$t('index-title')"
      :lead="$t('index-subtitle')"
    ></b-jumbotron>
    <b-input-group size="lg">
      <b-form-input
        v-model="search"
        :placeholder="$t('index-search-placeholder')"
        autocomplete="false"
        class="mr-2"
      ></b-form-input>
      <b-button variant="primary" size="lg">{{ $t('index-search') }}</b-button>
    </b-input-group>
    <p>Search query is: {{ search }}</p>
    <p>Also, welcome is: {{ $t('welcome') }}</p>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      search: ""
    };
  },
  watch: {
    search: function(value: any) {
      console.log(value);
    }
  }
};
</script>

<style></style>
