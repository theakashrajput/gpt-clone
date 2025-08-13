import bcrypt from 'bcrypt';

export const hashPassword = async (password)=>{
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword;
}

export const compareHashPassword = async (password, hashedPassword)=>{
    return bcrypt.compare(password, hashedPassword);
}

export const isEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);;
}

