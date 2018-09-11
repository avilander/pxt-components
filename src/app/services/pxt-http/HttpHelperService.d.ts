import { ConfigService } from './config.service';
export declare class HttpHelperService {
    private configService;
    constructor(configService: ConfigService);
    getApi(): any;
}
