<template>
  <div>
    <h2>{{ snapshot.name }}</h2>
    <hr />
    <p>
      <a :href="'/' + snapshot.familyId + '/' + snapshot.datasetId + '/' + snapshot.id">
        {{ $t('snapshot-files-back') }}
      </a>
    </p>
    <pre>
      <table>
        <thead>
          <tr>
            <th>{{ $t('snapshot-files-name') }}</th>
            <th>{{ $t('snapshot-files-size') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dumpfile in Object.keys(snapshot.files)">
            <td><a :href="snapshot.url + dumpfile">{{ dumpfile }}</a></td>
            <td>{{ getBytesRepresentation(snapshot.files[dumpfile].size) }}</td>
          </tr>
          <tr class="filelist-total">
            <td>{{ $t('snapshot-files-total') }}</td>
            <td>{{ getBytesRepresentation(snapshot.total_size) }}</td>
          </tr>
        </tbody>
      </table>
    </pre>
  </div>
</template>

<script>
import {getBytesRepresentation} from '~/common/converter';

export default {
  data() {
    return {
      snapshot: {},
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
      name: this.$i18n.t('datasets-family-' + familyId + '-snapshot-title', [localNameRes.name, localDate]),
      url: snapshotRes.url,
      files: snapshotRes.files,
      total_size: snapshotRes.total_size,
      familyId: snapshotRes.dataset.family.identifier,
      datasetId: snapshotRes.dataset.identifier,
    };
  },

  methods: {
    getBytesRepresentation: getBytesRepresentation,
  },
};
</script>

<style scoped>
pre {
  display: block;
  background-color: #f5f5f5;
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding-left: 2rem;
  padding-right: 2rem;
}

table {
  width: 100%;
}

thead {
  border-bottom: 1px solid #000000;
}

tr.filelist-total {
  border-top: 1px solid #000000;
  font-weight: bold;
}
</style>
