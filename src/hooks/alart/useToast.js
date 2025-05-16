import { Bounce, toast } from 'react-toastify';

export const useToast = () => {
    const showToast = ( type, message) => {
        const design ={ position: "bottom-right", autoClose: 3000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "colored", transition: Bounce,};
    
        if (type === 'success') {
            toast.success(message, design);
        }
        else if (type === 'warn') {
            toast.warn(message, design);
        }
        else if (type === 'error') {
            toast.error(message, design);
        }
    }
    return showToast;
};
