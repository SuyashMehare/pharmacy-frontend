import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FRONTEND_ROUTES } from "../constants/frontend_urls";
import { getRole } from "../utils/localStorage";

export function Home() {
    const navigation = useNavigate()
    
    useEffect(() => {
        
        if(getRole() == "admin")
            return navigation(FRONTEND_ROUTES.admin_dashboard);
        
        // if(getRole() == "regular")
        navigation('./products');
    });
    
    return <>
    </>
}