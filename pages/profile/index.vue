<template>
  <div>
    <h2>{{ $t('profile-title') }}</h2>
    <b-form-group
      label-cols="3"
      label-cols-lg="2"
      :label="$t('profile-username')"
      label-for="username"
    >
      <b-form-input id="username" readonly plaintext disabled value="Hydriz" />
    </b-form-group>
    <b-form-group
      label-cols="3"
      label-cols-lg="2"
      :label="$t('profile-email')"
      label-for="email"
      :description="$t('profile-email-explanation')"
    >
      <b-form-input id="email" type="email" value="admin@example.com" />
    </b-form-group>
    <b-form-group
      label-cols="3"
      label-cols-lg="2"
      :label="$t('profile-notifications')"
      label-for="notifications"
    >
      <b-form-select
        v-model="notifications"
        :options="notificationsOptions"
      ></b-form-select>
    </b-form-group>
    <b-button variant="primary">{{ $t('profile-save') }}</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      notifications: 'disable',
      notificationsOptions: [
        {
          value: 'disable',
          text: this.$t('profile-notifications-disable')
        },
        {
          value: 'enable',
          text: this.$t('profile-notifications-enable'),
        },
      ],
    };
  },

  async fetch() {
    const userId = 1
    const res = await this.$axios.$get('/api/v1/users/' + userId)
  }
};
</script>

<style></style>
