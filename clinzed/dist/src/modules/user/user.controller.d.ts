import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './user.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    findAll(req: any, params: any): Promise<any>;
    findOne(id: string, req: any): Promise<import("./entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto, req: any): Promise<import("./entities/user.entity").User>;
    remove(id: string, req: any): Promise<import("./entities/user.entity").User>;
}
