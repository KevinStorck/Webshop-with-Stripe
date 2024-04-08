import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios"
import { Order } from "../models/Order"

export const Orders = () => {
    const {user} = useContext(UserContext)
    const [orders, setOrders] = useState<Order[]>([])
    useEffect(() => {
                
    if (orders.length > 0) return
        const fetchOrders = async () => {
            
            const response = await axios.get(`http://localhost:3000/api/user/orders/${user?.id}`)
            
            if (response.status === 200) setOrders(response.data)
        }
    fetchOrders()
    })
    return (<>
    {orders?.map(o => <p key={o.id}>{o.id}</p>)}
    </>)
}