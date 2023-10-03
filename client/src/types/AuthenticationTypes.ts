
export type GoogleTokenResponseType =  Omit<GoogleTokenType, "error" | "error_description" | "error_uri">
export interface GoogleTokenType{
    access_token?: string;
    authuser?: string;
    expires_in?: number;
    prompt?: string;
    scope?: string;
    token_type?: string
}