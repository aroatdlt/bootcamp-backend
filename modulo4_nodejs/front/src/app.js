console.log('Running front app');

fetch('/api/accommodations')
  .then((response) => {
    return response.json();
  })
  .then((accommodations) => {
    console.log({ accommodations });
  });