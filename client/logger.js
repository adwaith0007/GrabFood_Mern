import log from 'loglevel';


log.setLevel(import.meta.env.DEV ? 'debug' : 'info');

export default log;