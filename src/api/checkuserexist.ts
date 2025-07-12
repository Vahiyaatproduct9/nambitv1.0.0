import supabase from '../libs/supabaseClient'

export async function checkUserExists() {
    const { data: authData, error: authError } = await supabase.auth.getUser()
    if (!authData.user) return 0
    const useremail = authData.user.email
    const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('phone, latitude, longitude, accuracy')
        .eq('email', useremail)
    if (usersData !== null) {
        if (usersData[0].phone === null || usersData[0].latitude === null || usersData[0].longitude === null || usersData[0].accuracy === null) {
            return 1 // User needs to fill additional info
        }
    }
    return 3 // User exists and has all required info
}