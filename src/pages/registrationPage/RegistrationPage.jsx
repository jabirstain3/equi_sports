import { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useToRoute } from "../../hooks/navigation/useToRoute";
import { useToast } from "../../hooks/alart/useToast";
import { AuthContext } from "../../utils/contexts/AuthContextProvider";
import { Bounce, ToastContainer } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import Loader from "../../components/loader/Loader";

const RegistrationPage = () => {
    const [ show, setShow ] = useState(false);
    const  [ currectFormate, setcurrectFormate ] = useState(true);
    const { createUser, googleUser, authLoading, updateUserProfile } = useContext(AuthContext);
    const location = useLocation();
    const goTo = useToRoute();
    const toast = useToast()

    document.title = "Register in to Spring Life";

    if (authLoading){
        return <div className="w-full h-screen">
            <Loader/>
        </div>
    }

    const HandelRegistrationWithGoogle = () =>{
        googleUser()
        goTo(dest);
    }

    const isValidPassword = (pwd) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (regex.test(pwd)) {
            setcurrectFormate(true);
        }
        else {
            setcurrectFormate(false);
        }
    };

    const dest = location.state?.from?.pathname || "/";

    const HandelRegistration = (e) =>{
        e.preventDefault();
        console.log(e);
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photo = e.target.photo.value;

        // const user = { name, email, password, photo };
        // console.log(user);
        const userinfo =  { displayName:name, photoURL:photo, }
        
        createUser(email, password)
            .then((result) =>{
                console.log(result.user);
                e.target.reset();
                updateUserProfile(userinfo)
                    .then(() =>{
                        toast("success" , "Registered Successfully.")
                        goTo('/login');
                    })
                    .catch((error)=>{
                        toast("error" , "Registeration failed.")
                        console.log(error.message);
                    })
                })
            .catch((error)=>{
                toast("error" , "Registeration failed.")
                console.log(error.message);
            })
    }

    return (
        <div className="mx-auto flex items-center justify-center h-screen bg-[#15559215]">
            <div className="py-10 md:py-20 px-20 md:px-32 grid gap-5 rounded-lg shadow-lg bg-white">
                <h1 className="text-4xl text-center font-bold text-[#3b9df8]">Registration</h1>

                <div className="flex justify-center items-center gap-5 mt-2">
                    <button className="border rounded-full p-2" onClick={HandelRegistrationWithGoogle}>
                        <FcGoogle className="text-2xl" />
                    </button>
                </div>

                <form className="grid gap-4 w-64 md:w-72 mx-auto" onSubmit={HandelRegistration}>
                    <p className="text-center">Or use email for registration</p>

                    <label htmlFor="" className="">
                        <input className="border w-full rounded-md  px-4 py-1.5" type="text" name="name" placeholder="User Name..." required />
                    </label>

                    <label htmlFor="">
                        <input className="border w-full rounded-md  px-4 py-1.5" type="email" name="email" placeholder="Email..."required />
                    </label>

                    <label htmlFor="">
                        <input className="border w-full rounded-md  px-4 py-1.5" type="url" name="photo" placeholder="Photo URL..."required />
                    </label>

                    <div className="relative">
                        <input className="border w-full rounded-md  px-4 py-1.5"  type={show ? 'text' : 'password'} name="password"  placeholder="password..." required onChange={(e) => isValidPassword(e.target.value)}/>
                        <span className='absolute top-2 right-2 cursor-default' onClick={() => setShow(!show)}>{ show ? "Hide" : "Show"}</span>
                    
                        { !currectFormate && <span className='text-xs text-red-700' onClick={() => setShow(!show)}>Use at least 8 characters, uppercase, and lowercase letter.</span>}
                    </div>

                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="terms" id="terms" />
                        <p htmlFor="terms">Accept our <a href="">terms and condation</a></p>
                    </div>

                    <input className="w-fit border rounded-md bg-[#155692] px-10 py-1 mt-2 mx-auto text-lg font-medium text-white" type="submit" value={"Register"} />

                    <p className="text-center">Have an account? <NavLink className={'hover:text-black '} to={'/login'} >Log In!</NavLink></p>
                    </form>
            </div>

            <ToastContainer position="bottom-right" autoClose={3000} limit={4} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" transition={Bounce} />

        </div>
    );
};

export default RegistrationPage;