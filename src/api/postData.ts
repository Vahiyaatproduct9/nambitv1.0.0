import supabase from '../libs/supabaseClient'

export async function postData(name: string, phone: number, address: string, lat: number, long: number, acc: number) {
    const { data: authData, error: authError } = await supabase.auth.getUser()
    if (authError || !authData) return { authError }
    const useremail = authData.user?.email
    const { data, error } = await supabase
        .from('users')
        .update({
            full_name: name,
            phone: phone,
            address: address,
            latitude: lat,
            longitude: long,
            accuracy: acc
        }).eq('email', useremail)
    return { data, error }
}