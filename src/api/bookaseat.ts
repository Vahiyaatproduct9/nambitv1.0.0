import supabase from '../libs/supabaseClient'
export async function bookaseat(SeatData: { email: string, name: string, phone: number, noOfGuest: number, date: Date, time: string, suggestion: string }) {
    const { data, error } = await supabase.from('bookings').insert(SeatData).select()
    return { data, error }
}