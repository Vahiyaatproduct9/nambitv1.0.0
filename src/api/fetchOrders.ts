import supabase from '../libs/supabaseClient'

export default async function fetchOrderPictures(itemList: { name: string }[]) {
    const { data } = await supabase
        .from('items')
        .select('image_url')
        .in('name', itemList.map(item => item.name));

    return data
}