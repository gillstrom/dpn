import test from 'ava';
import m from '.';

test('should return object', async t => {
	t.is(typeof await m('gillstrom'), 'object');
});
