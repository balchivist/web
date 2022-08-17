<template>
  <div>
    <h2>{{ $t('datasets-title') }}</h2>
    <p>
      {{ $t('datasets-description') }}
    </p>
    <b-table bordered hover :items="families" :fields="fields">
      <template #cell(id)="data">
        <a :href="'/' + data.item.id">
          {{ data.item.id }}
        </a>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          label: this.$i18n.t('datasets-table-id'),
          key: 'id',
          sortable: true,
        },
        {
          label: this.$i18n.t('datasets-table-name'),
          key: 'name',
          sortable: true,
        },
        {
          label: this.$i18n.t('datasets-table-description'),
          key: 'description',
        },
      ],
      families: [],
    };
  },

  async fetch() {
    const res = await this.$axios.$get('/api/v1/families/');

    this.families = res.results.map((family) => {
      return {
        id: family.identifier,
        name: this.$i18n.t('datasets-family-' + family.identifier + '-name'),
        description: this.$i18n.t(
          'datasets-family-' + family.identifier + '-desc',
        ),
      };
    });
  },
};
</script>

<style></style>
