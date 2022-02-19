export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        db: parseInt(process.env.REDIS_DB),
        password: '',//process.env.REDIS_PASSWORD,
        keyPrefix: 'nestjs-seed::',//process.env.REDIS_PREFIX,
    }
});
