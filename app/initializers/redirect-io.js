const existingSession = window.localStorage['ember_simple_auth:session'];

// Carefully parse the session
const isLoggedIn = (() => {
  if (!existingSession) return false;

  try {
    return JSON.parse(existingSession)['authenticated']['access_token'];
  } catch (e) {
    return false;
  }
})();

export function initialize() {
  if (window.location.origin.endsWith('.io')) {
    // Redirect to the new domain
    const url = new URL(window.location);
    url.host = url.host.replace('kitsu.io', 'kitsu.app');

    url.hash = `kitsu-io-session=${btoa(existingSession)}`;

    window.location.replace(url.toString());
  } else if (window.location.hash.match(/#kitsu-io-session=.*/)) {
    if (!isLoggedIn) {
      try {
        // Import the session from the hash
        const importedSession = JSON.parse(atob(/#kitsu-io-session=(.*)/.exec(window.location.hash)[1]));

        window.localStorage['ember_simple_auth:session'] = JSON.stringify(importedSession);
      } catch (e) {
        console.error('Failed to import session');
      }
    }
    window.explainRedirect = true;
    const url = new URL(window.location);
    url.hash = '';
    history.replaceState(null, '', url.toString());
  }
}

export default {
  name: 'redirectFromKitsuIO',
  initialize
};