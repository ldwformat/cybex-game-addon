/**
 *   @arg {string|Buffer} data
 *   @arg {string} [digest = null] - 'hex', 'binary' or 'base64'
 *   @return {string|Buffer} - Buffer when digest is null, or string
 */
declare function sha1(data: any, encoding?: any): any;
/**
 * @arg {string|Buffer} data
 *  @arg {string} [digest = null] - 'hex', 'binary' or 'base64'
 *  @return {string|Buffer} - Buffer when digest is null, or string
 */
declare function sha256(data: any, encoding?: any): any;
/**
 *   @arg {string|Buffer} data
 *   @arg {string} [digest = null] - 'hex', 'binary' or 'base64'
 *   @return {string|Buffer} - Buffer when digest is null, or string
 */
declare function sha512(data: any, encoding?: any): any;
declare function HmacSHA256(buffer: any, secret: any): any;
declare function ripemd160(data: any): any;
export { sha1, sha256, sha512, HmacSHA256, ripemd160 };
