import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || '',
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
)
export async function seeOrders() {
    const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .in('status', ['pending'])
    const user_ids = ordersData?.map(order => order.user_id);
    const uniqueUserIds = [...new Set(user_ids)];
    const { data: userData, error: userError } = await supabase.from('users').select('id, full_name, phone, address, created_at, latitude, longitude, accuracy').in('id', uniqueUserIds);
    const sendData = ordersData?.map((item, i) => {
        const user = userData?.find(user => user.id === item.user_id);
        return { ...item, user: user || null }
    })
    return sendData
}
export async function orderDelivered(id: string) {
    const { data, error } = await supabase
        .from('orders')
        .update({ status: 'accepted' })
        .eq('id', id)
}
export async function orderCancelled(id: string) {
    const { data, error } = await supabase
        .from('orders')
        .update({ status: 'deleted' })
        .eq('id', id)
    return { data, error }
}
export async function seeBookings() {
    const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .in('status', ['pending', 'confirmed'])
    if (error) {
        console.error('Error:', error);
    } else {
        return data
    }
}
export async function seeItems() {
    const { data, error } = await supabase.from('items').select('*')
    if (error || !data) return error.message
    return data
}
export async function addItem(file: File | null, name: string, price: string, description: string, category: string) {
    const filePath = `${file?.name}`
    const image_url = `https://dxqespjfgbivjfzmflpi.supabase.co/storage/v1/object/public/items//${filePath}`
    if (file) {
        const { error: ImageError } = await supabase.storage.from('items').upload(filePath, file, {
            cacheControl: '3600',
            upsert: true,
            contentType: file?.type,
        })
        if (ImageError) {
            return ImageError
        }
    }
    const info = { name, price, description, image_url, category }
    const { data, error } = await supabase.from('items').insert(info).select()
    if (error || !data) return error.message
    return data
}
export async function deleteItem(id: string, image_url: string) {
    const filePath = image_url.split('/').pop()
    const { error: fileError } = await supabase.storage.from('items').remove([filePath || ''])
    const { data, error } = await supabase.from('items').delete().eq('id', id)
    if (error || fileError || !data) return (error?.message, fileError?.message)
} 