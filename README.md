
# ajax-promise

  A lightweight and promise-based XHR wrapper with minimal dependencies.

  This uses native ES6 Promises if available, falling back to a polyfill.

  Largely inspired by https://github.com/kaerus-component/ajax.

## Installation

  Install with [component(1)](http://component.io):

    $ component install imiric/ajax-promise

## API

```js
var ajax = require('ajax-promise');

ajax.get('http://www.reddit.com/r/aww.json', function(response) {
  return JSON.parse(response);
}, function(error) {
  console.log(error) {
}).then(function(response) {
  console.log("JSON:", response);
});
```

## License

  [MIT](LICENSE)
