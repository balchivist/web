<template>
  <div>
    <h2>{{ dataset.name }}</h2>
    <p>{{ dataset.description }}</p>
    <i18n tag="p" path="dataset-desc-family">
      <a :href="'/' + dataset.familyId">
        {{ $t('datasets-family-' + dataset.familyId + '-name') }}
      </a>
    </i18n>
    <p>
      <a :href="dataset.url" target="_blank" rel="noreferrer noopener">
        Link to dataset
      </a>
    </p>

    <div v-if="view === 'list'">
      <b-row class="my-2">
        <b-col></b-col>
        <b-col sm="12" md="6">
          <b-input-group size="md">
            <b-form-input
              v-model="filter"
              :placeholder="$t('dataset-filter-placeholder')"
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
        :items="snapshots"
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
          <a :href="'/' + data.item.familyId + '/' + data.item.datasetId + '/' + data.item.id">
            {{ data.item.id }}
          </a>
        </template>
      </b-table>

      <b-row class="my-1">
        <b-col sm="5" md="6">
          <b-form-group
            :label="$t('dataset-label-perpage')"
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
  </div>
</template>

<script>
import {getBytesRepresentation} from '~/common/converter';

export default {
  data() {
    return {
      fields: [
        {
          label: this.$i18n.t('dataset-table-id'),
          key: 'id',
          sortable: true,
        },
        {
          label: this.$i18n.t('dataset-table-date'),
          key: 'date',
          sortable: true,
        },
        {
          label: this.$i18n.t('dataset-table-status'),
          key: 'status',
        },
        {
          label: this.$i18n.t('dataset-table-size'),
          key: 'total_size',
        },
      ],
      view: 'list',
      dataset: {},
      snapshots: [],
      filter: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 25,
      pageOptions: [5, 10, 25, 50, 100, 250, 500, 1000],
    };
  },

  async fetch() {
    const familyId = this.$route.params.family;
    const datasetId = this.$route.params.dataset;
    const datasetRes = await this.$axios.$get(
      '/api/v1/families/' + familyId + '/datasets/' + datasetId + '/',
    );
    const snapshotsRes = await this.$axios.$get(
      '/api/v1/families/' + familyId + '/datasets/' + datasetId + '/snapshots/',
    );
    const localNameRes = await this.$axios.$get('/api/v1/converter', {
      params: {language: this.$i18n.locale, db: datasetId},
    });

    this.dataset = {
      id: datasetRes.identifier,
      name: this.$i18n.t('datasets-family-' + familyId + '-dataset-title',
        [localNameRes.results[datasetRes.identifier]],
      ),
      description: this.$i18n.t(
        'datasets-family-' + familyId + '-dataset-desc',
        [localNameRes.results[datasetRes.identifier]],
      ),
      url: datasetRes.url,
      familyId: datasetRes.family.identifier,
    };

    this.snapshots = snapshotsRes.results.map((snapshot) => {
      return {
        id: snapshot.identifier,
        date: this.$i18n.d(new Date(snapshot.date), 'short'),
        status: this.$i18n.t('snapshot-status-' + snapshot.status),
        total_size: getBytesRepresentation(snapshot.total_size),
        familyId: snapshot.dataset.family.identifier,
        datasetId: snapshot.dataset.identifier,
      };
    });

    this.totalRows = this.snapshots.length;
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
