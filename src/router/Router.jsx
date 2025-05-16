import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import RegistrationPage from "../pages/registrationPage/RegistrationPage.jsx";
import LogInPage from "../pages/logInPage/LogInPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "registration",
        element: <RegistrationPage/>,
    },                     
    {
        path: "login",
        element: <LogInPage/>,
    },
])

export default router;