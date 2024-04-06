import axios from "axios"
import { useEffect, useState } from "react"

export const PaymentResult = () => {
    const [verified, setVerified] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        if(verified) return

        const verifyPayment = async () => {
            let sessionId = localStorage.getItem("stripeSessionId")
            if (!sessionId) return
            sessionId = JSON.parse(sessionId)
            const response = await axios.post("http://localhost:3000/api/stripe/verify-payment", {sessionId: sessionId})
            if (response.status === 200) {
                setVerified(response.data.isPayed)
                setIsLoading(false)
            }
        }

        verifyPayment()
    }, [verified])

    return <>{verified && !isLoading ? "Tack för ditt köp! Välkommen åter" : "wait"}</>
}