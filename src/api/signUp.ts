import supabase from '../libs/supabaseClient'

export async function signUp(email: string, password1: string, password2: string) {
    if (password1 !== password2) return { message: "Passwords are different :(" }
    const { data, error } = await supabase.auth.signUp({
        email,
        password: password1
    })

    const { data: signUpdata, error: signUpError } = await supabase.from('users').insert({
        email
    })
    return { data, error }
}