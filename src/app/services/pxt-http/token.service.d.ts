export declare class TokenService {
    constructor();
    getAccessToken(): string;
    setTokenStorage(res: any): void;
    removeTokenStorage(): void;
    deleteToken(): void;
    tokenExists(): boolean;
}
