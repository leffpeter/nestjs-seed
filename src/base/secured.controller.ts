import {UseGuards} from "@nestjs/common";
import {ApiBearerAuth} from "@nestjs/swagger";
import {JwtAuthGuard} from "src/auth/jwt-auth.guard";
import {BaseController, BaseCRUDController} from "./base.controller";
import {ICRUDService} from "./base.service";
import {IDto} from "./dto/base.dto";
import {IEntity} from "./entities/base.entity";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export abstract class SecuredController extends BaseController {
}

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export abstract class SecuredCRUDController<S extends ICRUDService<IEntity, IDto, IDto, IDto>, D extends IDto, C extends IDto, U extends IDto> extends BaseCRUDController<S, D, C, U> {
}
