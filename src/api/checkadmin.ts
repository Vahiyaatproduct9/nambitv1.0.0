const username = process.env.NEXT_PUBLIC_ADMIN_USER || '';
const password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '';
export function checkAdmin(user: string, pass: string) {
    if (user === username && pass === password) return true;
    return false
}