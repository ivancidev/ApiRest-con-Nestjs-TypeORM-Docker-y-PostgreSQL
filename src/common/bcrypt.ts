import * as bcrypt from 'bcrypt'

export function encodePassword(rawPassword: string): string {

    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword, salt);
}