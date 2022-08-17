<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-container fluid="md">
      <a href="/">
        <b-navbar-brand>
          <b-img
            src="/assets/images/logo.png"
            class="d-inline-block align-top"
            height="30"
            width="30"
            alt="Balchivist"
          />
          Balchivist
        </b-navbar-brand>
      </a>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown :text="$t('navbar-datasets')">
            <b-dropdown-item
              v-for="family in families"
              :key="family.id"
              :href="'/' + family.id"
            >
              {{ family.name }}
            </b-dropdown-item>
            <b-dropdown-divider />
            <b-dropdown-item href="/datasets">
              {{ $t('navbar-alldatasets') }}
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item href="/about">{{ $t('navbar-about') }}</b-nav-item>
          <b-nav-item href="/help">{{ $t('navbar-help') }}</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned navigation items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="/profile" right>
            {{ $t('navbar-profile') }}
          </b-nav-item>
          <b-nav-item href="/watchlist" right>
            {{ $t('navbar-watchlist') }}
          </b-nav-item>
          <b-nav-item href="/logout" right>
            {{ $t('navbar-logout') }}
          </b-nav-item>
          <b-nav-item-dropdown right>
            <template slot="button-content">
              <font-awesome-icon icon="fas fa-globe" />
            </template>
            <b-dropdown-item
              v-for="locale in availableLocales"
              :key="locale.code"
              @click="updateLocale(locale.code)"
            >
              {{ locale.name }}
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      families: [],
    };
  },

  async fetch() {
    const res = await this.$axios.$get('/api/v1/families/');
    this.families = res.results.map((family) => {
      return {
        id: family.identifier,
        name: this.$i18n.t('datasets-family-' + family.identifier + '-name'),
      };
    });
  },

  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
  },

  methods: {
    updateLocale(code) {
      this.$i18n.setLocale(code);
      this.$router.go();
    },
  },
};
</script>

<style></style>
