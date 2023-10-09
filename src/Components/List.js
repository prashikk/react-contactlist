
import { useSelector } from "react-redux";

import { contactSelector } from "../Redux/Reducers/contactReducer";
import ListItem from "./ListItem";
import UpdateSection from "./UpdateSection";
import AddContact from "./AddContact";
const List = () => {

    const {contactList,showContact,showAddContact} = useSelector(contactSelector);
    return(
        <div className="md:w-[45%] bg-black flex 
                        flex-col rounded m-2 md:my-2 md:ml-2 
                        w-full h-fill md:border-r-2 shadow-md
                         shadow-slate-400 text-white">

            <div className="w-fill md:hidden h-fit mb-2 border-b-2">
                {showContact ? <UpdateSection /> : null}
                {showAddContact ? <AddContact /> : null}
            </div>

            <div className="w-fill h-fill flex flex-col m-1 p-1 flex-nowrap 
                            overflow-auto">
                {contactList.map((contact,i) => <ListItem key={i}
                                                        contact={contact} />)}

            </div>
            
        </div>
    )
}


export default List;