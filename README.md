# Range-Shuffle [![Build Status](https://img.shields.io/travis/pueue/range-shuffle.svg?style=flat-square)](https://travis-ci.org/pueue/range-shuffle) [![Version](https://img.shields.io/npm/v/range-shuffle.svg?style=flat-square)](https://www.npmjs.com/package/range-shuffle) [![Download](https://img.shields.io/npm/dt/range-shuffle.svg?style=flat-square)](https://www.npmjs.com/package/range-shuffle)

A unduplicated & reversible random integer generator

## Getting Started

### Install

```sh
npm install --save range-shuffle
```

### Usage

```javascript
import Shuffler from 'range-shuffle';

const rs = new Shuffler({
  a: 13,
  c: 5,
  m: 100,
});

rs.LCG(22); // 91
rs.reverseLCG(91); // 22
```
