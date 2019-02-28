/** Exception nesting.  */
declare class ErrorWithCause {
    [param: string]: any;
    constructor(message: any, cause: any);
    static throw(message: any, cause: any): void;
}
export default ErrorWithCause;
