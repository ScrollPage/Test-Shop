module.exports = function(csrfToken) {
    let axiosDefaults = require('axios/lib/defaults');
    axiosDefaults.headers.common['X-CSRF-Token'] = csrfToken;
  };