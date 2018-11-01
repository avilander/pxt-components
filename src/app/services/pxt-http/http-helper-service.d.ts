import { ConfigService } from './config.service';
export declare class HttpHelperService {
    private configService;
    constructor(configService: ConfigService);
    getApi(): any;
    getApiSgi(): any;
    getFrontSgi(): any;
    getApiUrl(name: any, url: any): any;
    getUrlLogo(): any;
}
