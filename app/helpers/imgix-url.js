import { helper } from 'ember-helper';

export function imgixUrl([src, params = {}]) {
  const url = new URL(src);
  switch (url.hostname) {
    case 'media.kitsu.io':
    case 'media.kitsu.app':
      url.hostname = 'kitsu.imgix.net';
      break;
    case 'media-staging.kitsu.io':
    case 'media-staging.kitsu.app':
      url.hostname = 'kitsu-staging.imgix.net'
  }

  const existingParams = Object.fromEntries(new URLSearchParams(url.search));
  const options = new URLSearchParams({
    ...existingParams,
    auto: 'format',
    fm: 'png',
    ch: 'Width,DPR',
    ...params
  });
  url.search = options.toString();
  return url.toString();
}

export default helper(imgixUrl);
