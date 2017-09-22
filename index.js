'use strict';
const npmStats = require('npm-stats');
const sortObject = require('sort-object');

const getDependents = el => new Promise((resolve, reject) => {
	npmStats()
		.module(el)
		.dependents((err, res) => {
			if (err) {
				reject(err);
			}

			resolve(res);
		});
});

const getPackages = user => new Promise((resolve, reject) => {
	npmStats()
		.user(user)
		.list((err, res) => {
			if (err) {
				reject(err);
			}

			resolve(res);
		});
});

module.exports = user => {
	const ret = {};

	if (!user) {
		return Promise.reject(new Error('You have to provide a user'));
	}

	return getPackages(user)
		.then(data => Promise.all(data.map(el => getDependents(el).then(res => {
			if (!res.length > 0) {
				return;
			}

			ret[el] = res;
		})))
		.then(() => sortObject(ret)));
};
