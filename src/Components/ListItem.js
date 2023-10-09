
// dispatch hook from redux
import { useDispatch } from "react-redux";

// actions from contact Reducer
import { setShowContact } from "../Redux/Reducers/contactReducer";


const ListItem = (props) => {

    const dispatch = useDispatch();
    const {name, phone} = props.contact;

    const handleClick = (e) =>{
        dispatch(setShowContact(props.contact));
    }


    return(
        <div className="w-full flex justify-between 
                        h-12 cursor-pointer font-semibold
                        md:flex-col md:h-16 
                        min-[1100px]:flex-row min-[1100px]:h-12
                        hover:bg-[#9F91CC] 
                        border-b-2 border-slate-400 hover:border-[#5C4B99] 
                        p-2 hover:text-white bg-black" 
            onClick={handleClick}>
            <div>
                {name}
            </div>
            <div>
                <small>
                    {phone}
                </small>
            </div>
            
        </div>
    )
}

export default ListItem;