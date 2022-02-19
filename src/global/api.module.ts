import {Global, Module} from "@nestjs/common";


@Global()
@Module({
    // imports: [AuthModule],
    // providers: [AuthService],
    // exports: [AuthService]
})
export class GlobalApiModule {}
