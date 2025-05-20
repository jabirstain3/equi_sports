import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import RegistrationPage from "../pages/registrationPage/RegistrationPage.jsx";
import LogInPage from "../pages/logInPage/LogInPage.jsx";
import ErrorPage from "../pages/errorPage/ErrorPage.jsx";
import HomeLayout from "../layouts/homeLayout/HomeLayout.jsx";
import ProductDetailsLayout from "../layouts/productDetailsLayout/ProductDetailsLayout.jsx";
import ProtectedRoute from "../routes/protectedRoute/ProtectedRoute.jsx";
import CreateProductLayout from "../layouts/createProductLayout/CreateProductLayout.jsx";
import DisplayAllProductsLayout from "../layouts/displayAllProductsLayout/DisplayAllProductsLayout.jsx";
import DisplayMyProducts from "../layouts/displayMyProducts/DisplayMyProducts.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {
                path: "",
                element: <HomeLayout/>,
                loader: () => fetch(`${import.meta.env.VITE_DOMAIN}/products`)
            },
            {
                path: "products",
                element: <DisplayAllProductsLayout />,
            },
            {
                path: "createproduct",
                element: <ProtectedRoute> <CreateProductLayout/> </ProtectedRoute>,
            },
            {
                path: "product/:id",
                element: <ProtectedRoute> <ProductDetailsLayout/> </ProtectedRoute>,
            },
            {
                path: "product/:id/update",
                element: <ProtectedRoute> <ProductDetailsLayout/> </ProtectedRoute>,
            },
            {
                path: ":userbase/products",
                element: <ProtectedRoute> <DisplayMyProducts/> </ProtectedRoute>,
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