// converting a decimal number to base 62
export const id_to_base62 = id => {
        const digits = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let short_code = '';
        while (id > 0) {
                short_code = digits[id % 62] + short_code;
                id = parseInt(id / 62);
        }
        return short_code;
        
}
