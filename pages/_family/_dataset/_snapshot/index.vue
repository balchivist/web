<template>
  <div>
    <h2>{{ snapshot.name }}</h2>

    <b-row>
      <b-col md="4" order-md="2" class="bg-light pt-3">
        <h4>{{ $t('snapshot-details-sidebar-title') }}</h4>
        <ul>
          <i18n tag="li" path="snapshot-details-sidebar-status">
            <b-badge :variant="SNAPSHOT_STATUS_MAPPER[snapshot.status]">
              {{ $t('snapshot-status-' + snapshot.status) }}
            </b-badge>
          </i18n>
          <li>{{ $t('snapshot-details-sidebar-size', [getBytesRepresentation(snapshot.total_size)]) }}</li>
          <li>
            <a :href="snapshot.url" target="_blank" rel="noreferrer noopener">
              {{ $t('snapshot-details-sidebar-original') }}
            </a>
          </li>
          <li v-if="snapshot.archive_status === 'done'">
            <a :href="'https://archive.org/details/' + snapshot.archiveIdentifier" target="_blank"
               rel="noreferrer noopener">
              {{ $t('snapshot-details-sidebar-archive') }}
            </a>
          </li>
        </ul>
        <p>
          <a :href="'/' + snapshot.familyId + '/' + snapshot.datasetId + '/' + snapshot.id + '/files'">
            {{ $t('snapshot-details-sidebar-viewfiles') }}
          </a>
        </p>
      </b-col>
      <b-col order-md="1" class="pt-3">
        <p>{{ snapshot.description }}</p>
        <hr />
        <p>{{ $t('snapshot-details-main-partof') }}</p>
        <ul>
          <li v-if="snapshot.familyId !== snapshot.datasetId">
            <i18n tag="li" path="snapshot-details-main-dataset">
              <a :href="'/' + snapshot.familyId + '/' + snapshot.datasetId">
                {{ snapshot.localName }}
              </a>
            </i18n>
          </li>
          <li>
            <i18n tag="li" path="snapshot-details-main-family">
              <a :href="'/' + snapshot.familyId">
                {{ $t('datasets-family-' + snapshot.familyId + '-name') }}
              </a>
            </i18n>
          </li>
        </ul>
      </b-col>
    </b-row>

  </div>
</template>

<script>
import {getBytesRepresentation, getIAIdentifier} from '~/common/converter';
import {SNAPSHOT_STATUS_MAPPER} from '~/common/mappings';

export default {
  data() {
    return {
      snapshot: {},
      SNAPSHOT_STATUS_MAPPER: SNAPSHOT_STATUS_MAPPER,
    };
  },
  async fetch() {
    const familyId = this.$route.params.family;
    const datasetId = this.$route.params.dataset;
    const snapshotId = this.$route.params.snapshot;
    const snapshotRes = await this.$axios.$get(
      '/api/v1/families/' + familyId + '/datasets/' + datasetId + '/snapshots/' + snapshotId + '/',
    );
    const localNameRes = await this.$axios.$get('/api/v1/converter', {
      params: {language: this.$i18n.locale, db: datasetId},
    });
    const localDate = this.$i18n.d(new Date(snapshotRes.date), 'short');

    this.snapshot = {
      id: snapshotRes.identifier,
      name: this.$i18n.t('datasets-family-' + familyId + '-snapshot-title', [localNameRes.results[snapshotRes.dataset.identifier], localDate]),
      description: this.$i18n.t('datasets-family-' + familyId + '-snapshot-desc', [localNameRes.results[snapshotRes.dataset.identifier], localDate]),
      localName: localNameRes.results[snapshotRes.dataset.identifier],
      date: localDate,
      status: snapshotRes.status,
      archive_status: snapshotRes.archive_status,
      total_size: snapshotRes.total_size,
      url: snapshotRes.url,
      familyId: snapshotRes.dataset.family.identifier,
      datasetId: snapshotRes.dataset.identifier,
      archiveIdentifier: getIAIdentifier(familyId, datasetId, snapshotId),
    };
  },

  methods: {
    getBytesRepresentation: getBytesRepresentation,
  },
};
</script>

<style>
</style>
