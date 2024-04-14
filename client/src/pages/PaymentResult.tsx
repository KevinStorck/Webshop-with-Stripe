import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react"
import { UserContext } from "../context/UserContext"

export const PaymentResult = () => {
    const initialized = useRef(false)
    const {user} = useContext(UserContext)
    const [verified, setVerified] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        if(verified) return
        if (!initialized.current) {initialized.current = true
        

        const verifyPayment = async () => {
            let sessionId = localStorage.getItem("stripeSessionId")
            if (!sessionId) return
            sessionId = JSON.parse(sessionId)
            const response = await axios.post("http://localhost:3000/api/stripe/verify-payment", {userId: user?.id, sessionId: sessionId}, {withCredentials: true})
            if (response.status === 200) {
                setVerified(response.data.isPayed)
                setIsLoading(false)
                localStorage.removeItem("stripeSessionId")
            }
        }

        verifyPayment()
    }
    }, [verified])

    return <>{verified && !isLoading ? "Tack för ditt köp! Välkommen åter" : "wait"}</>
}