import * as crypto from 'crypto';

import { Service } from 'typedi';

@Service()
export class CryptoService {

    private static CRYPTO_ALGORITHM = 'sha256';
    private static CRYPTO_KEY_PASSWORD = 'dt82e67f';

    /**
     * @description Ciphers the password given to match in database
     * @param {string} password User's password
     * @returns {string} cipher password
     */
    public cipherUserPassword(password: string): string {
        const cipherPassword = crypto.createHmac(CryptoService.CRYPTO_ALGORITHM, CryptoService.CRYPTO_KEY_PASSWORD)
            .update(password)
            .digest('hex');
        return cipherPassword;
    }

    /**
     * @description Creates a token to be stored
     * @returns {string} Token
     */
    public createToken(): string {
        const token = crypto.randomBytes(20).toString('hex');
        return token;
    }

}
