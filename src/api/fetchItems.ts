import supabase from '../libs/supabaseClient';

export async function fetchItems(category: string) {
    if (category === 'all' || category === undefined || category === null) {
        const { data, error } = await supabase
            .from('items')
            .select('*')
        return data
    }
    const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('category', category);

    if (error) {
        console.error('Error fetching items:', error);
        return [];
    }
    return data;
}
export async function fetchCategory() {
    const { data, error } = await supabase.from('items').select('category')
    return data
}

export async function fetchHotItems() {
    const { data, error } = await supabase
        .from('hotitems')
        .select('name, price, description, image_url')
    if (error || !data) return error.message
    return data
}
