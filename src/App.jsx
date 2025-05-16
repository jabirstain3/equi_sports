import { Outlet } from "react-router-dom"
import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"
import { Bounce, ToastContainer } from "react-toastify"

function App() {

  return (
      <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
        <div className="border-t border-gray-500 py-4 bg-[#1556924f]">
          <p className="text-center text-sm">© 2023 Equi Sports. All rights reserved. Developed by jabirstain3</p>
        </div>
        <ToastContainer position="bottom-right" autoClose={3000} limit={4} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" transition={Bounce} />
      </div>
  )
}

export default App
