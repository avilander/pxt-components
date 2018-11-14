import { UserService } from '../user.service';
export declare class TokenService {
    userService: UserService;
    constructor(userService: UserService);
    getAccessToken(): string;
    setTokenStorage(res: any): void;
    removeTokenStorage(): void;
    deleteToken(): void;
    tokenExists(): boolean;
}
