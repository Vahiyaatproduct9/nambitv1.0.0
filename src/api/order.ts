import supabase from '../libs/supabaseClient'

export async function orderbuttonpress(flattened: { name: string, price: number }[], totalPrice: number) {
    const { data: authData, error: authError } = await supabase.auth.getUser()
    if (!authData.user) return 0
    const useremail = authData.user.email
    const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('id, phone, latitude, longitude, accuracy')
        .eq('email', useremail)
    if (usersData !== null) {
        if (usersData[0].phone === null || usersData[0].latitude === null || usersData[0].longitude === null || usersData[0].accuracy === null) {
            return 1 // User needs to fill additional info
        }
    }
    const { data, error } = await supabase.from('orders').insert({
        user_id: usersData && usersData[0].id,
        order: flattened,
        price: totalPrice,
        status: 'pending',
    }).select()
    if (!data || error) return error
    return 3
}