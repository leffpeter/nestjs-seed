import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {jwtConstants} from 'src/auth/auth.constants';
import {EventsGateway} from './events.gateway';


@Module({
    // imports: [],
    // imports: [AuthModule],
    imports: [
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '3600s'},
        }),
    ],
    providers: [
        //TODO EventsService
        EventsGateway
    ],
})
export class EventsModule {
}

