'use strict';
var npmStats = require('npm-stats');
var Promise = require('pinkie-promise');
var sortObject = require('sort-object');

function getDependents(el) {
	return new Promise(function (resolve, reject) {
		npmStats().module(el).dependents(function (err, res) {
			if (err) {
				reject(err);
			}

			resolve(res);
		});
	});
}

function getPackages(user) {
	return new Promise(function (resolve, reject) {
		npmStats().user(user).list(function (err, res) {
			if (err) {
				reject(err);
			}

			resolve(res);
		});
	});
}

module.exports = function (user) {
	var ret = {};

	if (!user) {
		return Promise.reject(new Error('You have to provide a user'));
	}

	return getPackages(user).then(function (data) {
		return Promise.all(data.map(function (el) {
			return getDependents(el, ret).then(function (res) {
				if (!res.length) {
					return;
				}

				ret[el] = res;
			});
		})).then(function () {
			return sortObject(ret);
		});
	});
};
