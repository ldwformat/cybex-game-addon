/// <reference types="react" />
export declare type RegFormData = {
    accountName: string | null;
    password: string | null;
    confirm?: string | null;
    captcha: string | null;
    referer?: string | null;
};
export declare const RegForm: (props: any) => JSX.Element;
