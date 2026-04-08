import bcrypt from 'bcrypt'

const password = '123'
const passwordComparison = '123'
const saltRounds = 14;
const hashedPassword = await bcrypt.hash(password, saltRounds)
const passwordsIsSame = await bcrypt.compare(passwordComparison,hashedPassword)