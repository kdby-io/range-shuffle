# Range-Shuffle [![Build Status](https://img.shields.io/travis/pueue/range-shuffle.svg?style=flat-square)](https://travis-ci.org/pueue/range-shuffle) [![Version](https://img.shields.io/npm/v/range-shuffle.svg?style=flat-square)](https://www.npmjs.com/package/range-shuffle) [![Download](https://img.shields.io/npm/dt/range-shuffle.svg?style=flat-square)](https://www.npmjs.com/package/range-shuffle)

A unduplicated & reversible random integer generator.

## Getting Started

### Install

```sh
npm install --save range-shuffle
```

### Usage

```javascript
const Shuffler = require('range-shuffle');
// or
import Shuffler from 'range-shuffle';

const rs = new Shuffler({
  MULTIPLIER: 7, // it must be a prime number
  INCREMENT: 6,
  MODULUS: 10,
});

const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const shuffled = array.map(int => rs.LCG(int));
// [6, 3, 0, 7, 4, 1, 8, 5, 2, 9]
const reversed = shuffled.map(int => rs.reverseLCG(int));
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## Principle

## Note

All constants & method arguments can be both `Number` and `String` type.  
If you want to use a large number over `Number.MAX_SAFE_INTEGER`(9007199254740991), use a `String` type input like `.LCG('9999999999999999')`.

## API

### `new Shuffler(constants)`

`constants` is a object that must contain **three constants**:

- `MULTIPLIER`: Must be **a prime number**.
- `INCREMENT`
- `MODULUS`: Range for shuffling. `0 ~ (MODULUS - 1)`

### `.LCG(integer)`

Performs linear congruential generating based on constants.

### `.reverseLCG(integer)`

Restore linear congruential generating based on constants.
