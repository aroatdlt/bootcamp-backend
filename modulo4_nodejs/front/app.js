console.log('Running front app');

fetch('https://localhost:3000/api/accommodations')
  .then((response) => {
    return response.json();
  })
  .then((accommodations) => {
    console.log({ accommodations });
  });