import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
export declare const transportOption: (configService: any) => Promise<{
    transport: {
        host: any;
        port: any;
        secure: boolean;
        auth: {
            user: any;
            pass: any;
        };
    };
    defaults: {
        from: any;
    };
    template: {
        dir: string;
        adapter: HandlebarsAdapter;
        options: {
            strict: boolean;
        };
    };
}>;
