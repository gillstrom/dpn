# dpn [![Build Status](https://travis-ci.org/gillstrom/dpn.svg?branch=master)](https://travis-ci.org/gillstrom/dpn)

> Get the dependents of a users npm modules

## Install

```
$ npm install dpn
```


## Usage

```js
const dpn = require('dpn');

dpn('gillstrom').then(result => {
	console.log(result);
	//=> {'app-size': ['osx-app'], 'array-max-length': ['get-arrows'], 'battery-level': ['evac'], ...}
});
```


## API

### dpn(username)

Returns a promise that resolves to an object.

#### username

*Required*<br>
Type: `string`

The username to look up.


## Related

* [dpn-cli](https://github.com/gillstrom/dpn-cli) - CLI for this module


## License

MIT © [Andreas Gillström](https://github.com/gillstrom)
