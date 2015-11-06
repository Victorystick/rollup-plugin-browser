# rollup-plugin-browser
Use Rollup as a ES module loader, like a simpler SystemJS.

## Installation
```
npm install --save rollup-plugin-browser
```

## Usage
```js
import { rollup } from 'rollup';
import browser from 'rollup-plugin-browser';

rollup({
  entry: 'app.js',

  plugins: [
    browser()
  ]
}).then( bundle => (0, eval)( bundle.generate().code ) );
```

## License
MIT
