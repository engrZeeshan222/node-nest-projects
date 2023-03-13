import { AuthService } from '../auth.service';
import { Request } from 'express';
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(req: Request): Promise<any>;
}
export {};
