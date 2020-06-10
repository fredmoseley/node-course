const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    //success
    // resolve([7, 4, 1]);
    //fail
    reject('Things went wrong');
  }, 2000);
});

doWorkPromise
  .then((result) => {
    console.log('Success', result);
  })
  .catch((error) => console.log(error));
