function delay(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(
        "Await makes everything wait until promise written after it is completed"
      );
      resolve();
    }, time);
  });
}

async function delayer(time) {
  await delay(time);
  //You can only pass a promise or a func that returs a promise, after await, so that await has any effect
  //If you pass a direct val it, await will have no effect
}

console.log("Start");
await delayer(2000);
console.log("End");
