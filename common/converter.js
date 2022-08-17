export function getBytesRepresentation(bytes) {
  const prefix = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']

  let power = 0

  while (bytes > 1024) {
    bytes /= 1024
    power++
  }

  if (power === 0) {
    return bytes + ' bytes'
  }

  return (Math.round(bytes * 10) / 10) + ' ' + prefix[power] + 'B'
}

export function getIAIdentifier(family, dataset, snapshot) {
  const IDENTIFIER_PREFIX = {
    'dumps': '',
    'mediacounts': 'mediacounts-',
    'wikibase': 'wikibase-'
  }

  const FAMILIES_WITHOUT_DATASET = ['mediacounts']

  if (!(family in IDENTIFIER_PREFIX)) {
    return ''
  }

  if (family in FAMILIES_WITHOUT_DATASET) {
    return IDENTIFIER_PREFIX[family] + snapshot
  }

  return IDENTIFIER_PREFIX[family] + dataset + '-' + snapshot
}
