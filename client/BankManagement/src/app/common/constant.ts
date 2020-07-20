export class Constant {
    public static readonly PATTERN = {
        NUMBER: /^[0-9]*$/,
        EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        DOUBLE: '^-?[0-9]\\d*(\\.\\d{1,3})?$',
    };
}
