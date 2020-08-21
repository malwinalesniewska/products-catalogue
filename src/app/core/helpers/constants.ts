export class Constants {}

export const defaultPrice = 0;

/**
 * @ngModule CoreModule
 * @description
 *
 * Interface for validation expressions
 */

interface ValidationConst {
    readonly PricePattern: RegExp;
    readonly ImgSrcPattern: RegExp;
}

/**
 * @ngModule CoreModule
 * @description
 *
 * Object holding validation expression constants
 */
const validationExp: ValidationConst = {
    PricePattern: /(\d+\.?\,?\d{0,2})/,
    ImgSrcPattern: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
};

export const ValidationExp: ValidationConst = validationExp;
