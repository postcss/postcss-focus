import postcss from 'postcss';
import test    from 'ava';

import plugin from './';

function run(t, input, output) {
    return postcss([ plugin ]).process(input)
        .then( result => {
            t.deepEqual(result.css, output);
            t.deepEqual(result.warnings().length, 0);
        });
}

test('adds focus selector', t => {
    return run(t, 'a:hover, b {}', 'a:hover, b, a:focus {}');
});

test('adds focus selector', t => {
    return run(t, 'a:hover, b:hover {}',
                  'a:hover, b:hover, a:focus, b:focus {}');
});
