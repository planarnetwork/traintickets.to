export default (
  navigator.geolocation || {
    getCurrentPosition: (success, failure) => {
      failure(`Your browser doesn't support geolocation.`);
    },
  }
);
