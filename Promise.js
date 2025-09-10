function delay(time) {
  //Promise takes a callback as an arg, the callback can have 2 args resolve and reject
  //Resolve just tells the promise has completed
  //When resolve() or resolve(arg) is called it tells that the promise was fullfilled and now it can be retured
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Class has started");
    }, time);
  });
}

console.log("Waiting for class to start");
console.log("Revising for class.....");
delay(2000).then((result) => {
  console.log(result);
});

function div(num1, num2) {
  return new Promise((resolve, reject) => {
    if (num2 === 0) {
      reject(`${num1} / ${num2} = Cannot div by 0`);
    } else {
      resolve(`${num1} / ${num2} = ${num1 / num2}`);
    }
  });
}
div(10, 2)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

div(10, 0)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
