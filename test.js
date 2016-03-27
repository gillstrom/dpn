import test from 'ava';
import fn from './';

test('should return object', async t => {
	t.is(typeof await fn('gillstrom'), 'object');
});
