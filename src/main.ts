import {NestFactory} from '@nestjs/core';
// import {VersioningType} from '@nestjs/common';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import * as compression from 'compression';
import * as helmet from 'helmet';
// import * as csurf from 'csurf';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {RedisIoAdapter} from './adapters/redis-io.adapter';

async function bootstrap() {
    const apiPrefix = 'api';
    const version = '1.0.0';

    const corsOptions = {
        // origin: '*',
        origin: true,
        credentials: true,
        optionSuccessStatus: 200,
    }
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix(apiPrefix);

    // app.enableVersioning({
    // type: VersioningType.HEADER,
    // header: 'x-nestjs-seed-api',
    //
    // type: VersioningType.URI,
    // });

    const config = new DocumentBuilder()
        .setTitle('nestjs-seed: NestJS project seed')
        .setDescription('This is a seed for NestJS based projects')
        .setVersion(version)
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(apiPrefix, app, document);

    app.use(compression());

    app.use(helmet({
        contentSecurityPolicy: false,
    }));

    // app.use(csurf());

    app.enableCors(corsOptions);

    app.useGlobalPipes(new ValidationPipe());

    app.useWebSocketAdapter(new RedisIoAdapter(app))
    // app.useWebSocketAdapter(new WsAdapter(app))

    await app.listen(process.env.PORT);
}

//run cluster
//npm run build
//pm2 start dist/main.js -i max

bootstrap();
