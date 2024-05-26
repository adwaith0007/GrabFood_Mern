import log from 'loglevel';

const environment = import.meta.env.VITE_ENV || 'production';

switch (environment) {
  case 'development':
    log.setLevel('debug'); // Enable all logs in development
    break;
  case 'production':
    log.setLevel('error'); // Only show error logs by default in production
    break;
  default:
    log.setLevel('silent'); // Disable all logs by default
}

// Function to log messages in production
const logInProduction = (...args) => {
  if (environment === 'production') {
    log.info(...args); // Info level for production-specific logs
  }
};

export { log, logInProduction };