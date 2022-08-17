<template>
  <div>
    <h2>{{ family.name }}</h2>
    <p>{{ family.description }}</p>
    <p><a :href="family.url">Link to dataset</a></p>

    <b-row class="my-2">
      <b-col></b-col>
      <b-col sm="12" md="6">
        <b-input-group size="md">
          <b-form-input
            v-model="filter"
            :placeholder="$t('family-filter-placeholder')"
            type="search"
            autocomplete="false"
            class="mr-2"
          ></b-form-input>

          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <b-col></b-col>
    </b-row>

    <b-table
      :items="datasets"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      stacked="md"
      bordered
      hover
      @filtered="onFiltered"
    >
      <template #cell(id)="data">
        <a :href="'/' + data.item.familyId + '/' + data.item.id">
          {{ data.item.id }}
        </a>
      </template>
    </b-table>

    <b-row class="my-1">
      <b-col sm="5" md="6">
        <b-form-group
          :label="$t('family-label-perpage')"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
            class="w-25"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col sm="4" md="3" class="ml-auto">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          label: this.$i18n.t('family-table-id'),
          key: 'id',
          sortable: true,
        },
        {
          label: this.$i18n.t('family-table-name'),
          key: 'name',
          sortable: true,
        },
        {
          label: this.$i18n.t('family-table-latest'),
          key: 'latest',
          sortable: true,
        },
      ],
      family: {},
      datasets: [],
      filter: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 25,
      pageOptions: [5, 10, 25, 50, 100, 250, 500, 1000],
    };
  },

  async fetch() {
    const familyId = this.$route.params.family;
    const familyRes = await this.$axios.$get(
      '/api/v1/families/' + familyId + '/',
    );
    const datasetsRes = await this.$axios.$get(
      '/api/v1/families/' + familyId + '/datasets/',
    );
    const datasetIds = datasetsRes.results.map((dataset) => dataset.identifier);
    const localNames = await this.$axios.$get(
      '/api/v1/converter?language=' + this.$i18n.locale + '&db=' + datasetIds.join('&db='),
    );

    this.family = {
      id: familyRes.identifier,
      name: this.$i18n.t('datasets-family-' + familyRes.identifier + '-name'),
      description: this.$i18n.t(
        'datasets-family-' + familyRes.identifier + '-desc',
      ),
      url: familyRes.url,
    };

    this.datasets = datasetsRes.results.map((dataset) => {
      return {
        id: dataset.identifier,
        name: localNames.results[dataset.identifier],
        latest: dataset.latest_snapshot_date == null ?
          '-' :
          this.$i18n.d(new Date(dataset.latest_snapshot_date), 'short'),
        familyId: dataset.family.identifier,
      };
    });

    this.totalRows = this.datasets.length;
  },

  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>

<style></style>
