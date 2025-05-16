import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import RegistrationPage from "../pages/registrationPage/RegistrationPage.jsx";
import LogInPage from "../pages/logInPage/LogInPage.jsx";
import ErrorPage from "../pages/errorPage/ErrorPage.jsx";
import HomeLayout from "../layouts/homeLayout/HomeLayout.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {
                path: "",
                element: <HomeLayout/>,
            },
        ]
    },
    {
        path: "registration",
        element: <RegistrationPage/>,
    },                     
    {
        path: "login",
        element: <LogInPage/>,
    },
    {
        path: "*",
        element: <ErrorPage/>,
    },
])

export default router;