import axios from "axios";
import { useEffect } from "react"
import { useParams } from "react-router-dom"

export default function() {
    const params = useParams()

    async function getSingleProduct() {
        const productId = params.productId;

        axios.get()
    }
    useEffect(() => {

    }, []);

    return <>
        {JSON.stringify(params)}
        product...
    </>
}