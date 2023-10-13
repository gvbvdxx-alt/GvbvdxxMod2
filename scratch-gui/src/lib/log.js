import minilog from 'minilog';

var ogconsoleerror = console.error;

minilog.enable();

export default minilog('gui');
