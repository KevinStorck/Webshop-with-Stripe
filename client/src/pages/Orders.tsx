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
    {orders?.map(o => <div className="order" key={o.id}>
        <p key={o.id}>OrderId: {o.id}</p>
        <p>Total Cost: {o.cost/100} {o.products[0].currency}</p>
        <div className="orderProducts">{o.products.map(p => <div className="orderProduct"><img className="orderImg" src={p.price.product.images[0]} alt={p.description} /><div><p>Product: {p.description}, Quantity: {p.quantity}</p></div><p>Cost: {(p.price.unit_amount - p.amount_discount/p.quantity)/100} {p.price.currency}</p><p>Total Cost: {(p.amount_total)/100} {p.currency}</p></div>)}</div>
        </div>)}
    </>)
}