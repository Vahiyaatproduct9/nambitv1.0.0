import supabase from '../libs/supabaseClient';

async function fetchItems(category: string) {
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

export default fetchItems;
