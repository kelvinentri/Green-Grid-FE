
import {toast,Slide} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export function successToast(message){
	toast.success(message, {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
		transition: Slide,
		});
}
export function ErrorToast(message){
	toast.error(message, {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
		transition: Slide,
		});
}