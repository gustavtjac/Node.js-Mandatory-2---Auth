import bcrypt from 'bcrypt'

const SALT_ROUNDS = 14;


export async function hashPassword(password){
    return await bcrypt.hash(password, SALT_ROUNDS)
}

export async function compareHashedPassords(rawPassword, hashedPassword) {
    return await bcrypt.compare(rawPassword, hashedPassword)
}