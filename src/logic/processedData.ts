import { seeOrders, seeItems } from "@/api/adminaction";
import { haversine } from "@/api/haversine";
export async function fetchOrders() {
    const orders = await seeOrders();
    let processed = orders?.map(order => {
        let user = order.user;
        const googleMapLink = `https://www.google.com/maps?q=${user?.latitude},${user?.longitude}`;
        const locationurl = `https://api.geoapify.com/v1/geocode/reverse?lat=${user?.latitude}&lon=${user?.longitude}&apiKey=e67b472df03f4af1bfb916131ea35668`
        const varlocation = async () => {
            const c = await fetch(locationurl)
            const d = await c.json()
            return d.features[0].properties.county
        }
        const location = varlocation()
        const time = new Date(order.created_at).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        })
        const date = new Date(order.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
        const dist = haversine(user.latitude, user.longitude, 26.3820903, 88.3132877)
        const calcdistance = ((dist - (user.accuracy / 1000)).toFixed(2) + ' ~ ' + (dist + (user.accuracy / 1000)).toFixed(2)).toString()
        return { ...order, googleMapLink, location, time, date, calcdistance }
    })
    return processed;
}
export async function fetchItems() {
    const items = await seeItems();
    if (typeof items === 'object' && items !== null) {
        const uniqueCategories = [... new Set(items.map(item => item.category))]
        const groupedItems = uniqueCategories.map(category => {
            const categoryItems = items.filter(item => item.category === category)
            return { category, categoryItems }
        })
        return groupedItems
    }
}