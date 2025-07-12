const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const hotitems = [{
    name: "Egg Hakka Noodles",
    price: 50,
    description: "Hakka noodles stir-fried with egg, veggies, and savory sauces.",
    image_url: "",
},
{
    name: "Chicken Roll",
    price: 50,
    description: "Delicious roll with marinated chicken, veggies, and flavorful chutneys.",
    image_url: "",
},
{
    name: "Chicken Biryani",
    price: 110,
    description: "Aromatic basmati rice cooked with marinated chicken and traditional spices.",
    image_url: "",
}]

const { data, error } = await supabase.from('hotitems').insert(hotitems).select()

console.log(data, error);