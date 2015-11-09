# dpn [![Build Status](https://travis-ci.org/gillstrom/dpn.svg?branch=master)](https://travis-ci.org/gillstrom/dpn)

> Get the dependents of a users npm modules


## CLI

```
$ npm install --global dpn
```

```
$ dpn --help

  Usage
    $ dpn [username]

  Options
    --json     Output the result as JSON
    --verbose  Show the name of the dependents
```


## Install

```
$ npm install --save dpn
```


## Usage

```js
const dpn = require('dpn');

dpn('gillstrom').then(res => {
	console.log(res);
	//=> {'app-size': [ 'osx-app' ], 'array-max-length': [ 'get-arrows' ], 'battery-level': [ 'evac' ], ...}
});
```


## API

### dpn(username)

#### username

*Required*  
Type: `string`

The username to look up.


## License

MIT © [Andreas Gillström](http://github.com/gillstrom)
