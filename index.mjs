import * as winston from 'winston';

const total_log_lines = 10_000;


const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'warn',
            format: winston.format.json()
        }),
        new winston.transports.File({
            filename: `./out/log.log`,
            level: 'info',
            tailable: true,
            maxFiles: 3,
            maxsize: 10_000,
            format: winston.format.json(),
        }),
    ],
});


const generateLogs = (remaining_messages) => {
    console.log(`here ${remaining_messages}`);
    const messages_per_iteration = 100;
    for (let i = remaining_messages; i >= 0 && i >= remaining_messages - messages_per_iteration; i--) {
        logger.info(`this is a test ${i}`);
    }

    if (remaining_messages - messages_per_iteration > 0) {
        logger.warn(`Completed ${total_log_lines - remaining_messages}`)
        setImmediate(() => generateLogs(remaining_messages - messages_per_iteration), 200);
    } else {
        logger.warn('Log test complete');
    }
};

setImmediate(() => {
    logger.warn('Starting log test');
    generateLogs(total_log_lines)
});
