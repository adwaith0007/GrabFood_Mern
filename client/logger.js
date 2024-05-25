import log from 'loglevel';


log.setLevel(process.env.REACT_APP_LOG_LEVEL || 'info');

export default log;