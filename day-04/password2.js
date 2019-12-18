const fs = require('fs');
const readline = require('readline');

main();

function main() {
  readInput();
}

function readInput() {
  const filename = process.argv[2];
  const readStream = fs.createReadStream(filename);
  const readInterface = readline.createInterface({ input: readStream });
  let min, max;

  readInterface.on('line', (line) => {
  
    [min, max] = line.split('-');

  }).on('close', () => {
    console.log('Solving for', min, max);
    solve(min, max);
  });
}

function solve(min, max) {
  let meetCriteria = 0;

  for (let password = min; password < max; password++) {
    if (validPassword(password)) {
      meetCriteria++;
    }
  }

  console.log('Passwords that meet the criteria:', meetCriteria);
}

function validPassword(password) {
  const digits = password.toString().split('');

  const adjacentDoubleDigits = digits.some(
    (currentVal, index, arr) => {
      let nextVal, valueAfterThat, previousValue;

      if (index < arr.length - 1) {
        nextVal = arr[index + 1];
      }

      if (index < arr.length - 2) {
        valueAfterThat = arr[index + 2];
      }

      if (index > 0) {
        previousValue = arr[index - 1];
      }

      if (currentVal === nextVal) {
        // make sure this isn't part of a larger group of repeating digits.
        return currentVal !== valueAfterThat && currentVal !== previousValue; 
      }

      return false;
    }
  );

  const increasingDigits = digits.every(
    (currentVal, index, arr) => {
      if (index == 0) {
        return true;
      } else {
        return currentVal >= arr[index - 1];
      }
    }
  );

  return adjacentDoubleDigits && increasingDigits;
}
