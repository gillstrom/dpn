#!/usr/bin/env node
'use strict';
var chalk = require('chalk');
var elegantSpinner = require('elegant-spinner');
var figures = require('figures');
var indentString = require('indent-string');
var logUpdate = require('log-update');
var meow = require('meow');
var sortObject = require('sort-object');
var fn = require('./');

var cli = meow([
	'Usage',
	'  $ dpn [username]',
	'',
	'Options',
	'  --json     Output the result as JSON',
	'  --verbose  Show the name of the dependents'
]);

var spinner;

if (!cli.flags.json) {
	var frame = elegantSpinner();

	spinner = setInterval(function () {
		logUpdate(frame());
	}, 75);
}

fn(cli.input[0]).then(function (res) {
	if (cli.flags.json || !process.stdin.isTTY) {
		console.log(res);
		process.exit();
	}

	clearInterval(spinner);
	logUpdate();

	res = sortObject(res, {
		sort: function (a, b) {
			return res[a].length - res[b].length;
		}
	});

	Object.keys(res).forEach(function (el) {
		console.log(chalk.bold(res[el].length) + ' ' + figures.arrowRight + ' ' + el);

		if (cli.flags.verbose) {
			res[el].forEach(function (dep) {
				console.log(indentString(chalk.dim(dep), ' ', 6));
			});
		}
	});
});
