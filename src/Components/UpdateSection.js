
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { contactSelector, deleteContactThunk, 
        setShowContact, updateContactThunk } from "../Redux/Reducers/contactReducer";
const UpdateSection = () => {
    const dispatch = useDispatch();

    const {showContact} = useSelector(contactSelector);
    const [formData, setFormData] = useState({});
    const [address,setAddress] = useState({});
    const [isChanged,setIsChanged]=useState(false);

    useEffect(()=>{
        setFormData(showContact);
        setAddress(showContact.address);
    },[showContact])

    const handleChange = (e) => {

        if(!isChanged){
            setIsChanged(true);
        }

        const {name,value} = e.target;
        
        setFormData({ 
            ...formData,
            [name]:value,
        })
    }

    const handleAddressChange = (e) => {
        if(!isChanged){
            setIsChanged(true);
        }

        const {name,value} = e.target;
        
        setAddress({
            ...address,
            [name]:value,
        })

        setFormData({
            ...formData,
            address:{
                ...address,
                [name]:value
            }
        });
    }

    const handleSubmit = (e) => {

        if(!isChanged){
            toast.error('Nothing to update in contact !!');
            return;
        }
        if(formData.name === '' || formData.phone === ''){
            toast.error('Name / Phone cannot be empty');
            return;
        }

        e.preventDefault();
        dispatch(updateContactThunk(formData));
        // toast notification
        toast.success('Contact Data is updated!!');
        setIsChanged(false);
    }


    // handle the contact delete
    const handleDelete = (e) => {
        e.preventDefault();
        // call the function for deleting the contact
        dispatch(deleteContactThunk(formData));
        // toast notification
        toast.success('Contact is removed from the List !!');
        setIsChanged(false);
    }


    // render the update contact section
    return(
        <>
            {/* button to close the section */}
            <button className="bg-red-500 px-[2px] w-5 
                                text-white rounded shadow-md" 
                    onClick={() => dispatch(setShowContact(null))}>
                X
            </button>

            {/* section to show a dummy picture */}
            <div className="flex h-[200px] justify-center items-center m-2">
                
                {/* image container */}
                <div className="w-[200px] h-full bg-black rounded-full overflow-hidden ">
                    <img src={require('../Assets/dummy-avatar.jpg')} alt="avatar" />
                </div>
            </div>

            {/* form container showing all the values */}
            <div className="bg-black p-2 rounded">
                {/* form */}
                <form onSubmit={handleSubmit}>
                    {/* table for forms layout */}
                    <table className="border-separate border-spacing-2">
                        <tbody>
                            {/* row for name */}
                            <tr>
                                <td>
                                    {/* for label */}
                                    <label for="name" className="text-black font-semibold">
                                        Name:
                                    </label>
                                </td>
                                <td>
                                    {/* input bar */}
                                    <input type="text"
                                        id="name" 
                                        name="name" 
                                        value={formData.name} 
                                        onChange={handleChange}
                                        className="rounded-sm focus:outline-none focus:border-2 focus:border-[#61677A]" 
                                        required />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {/* label */}
                                    <label for="phone" className="text-black  font-semibold">
                                        Phone:
                                    </label>
                                </td>
                                <td>
                                    <input type="text"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="rounded-sm focus:outline-none focus:border-2 focus:border-[#61677A] "
                                        required />
                                </td>
                            </tr>

                            {/* row for email address */}
                            <tr>
                                <td>
                                    {/* label */}
                                    <label for="email" className="text-black font-semibold">
                                        Email:
                                    </label>
                                </td>
                                <td>
                                    {/* input bar */}
                                    <input type="text"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        className="rounded-sm focus:outline-none focus:border-2 focus:border-[#61677A] "
                                        onChange={handleChange} 
                                        required />
                                </td>
                            </tr>

                            {/* row for address heading */}
                            <tr>
                                <td colSpan={2}>
                                    {/* label */}
                                    <label className="text-black  font-semibold">Address</label>
                                </td>
                            </tr>

                            {/* row for house no. inside the address */}
                            <tr>
                                <td>
                                    {/* label */}
                                    <label for="suite" className="text-black  font-semibold">
                                        H. No.:
                                    </label>
                                </td>
                                <td>
                                    {/* input bar */}
                                    <input type="text"
                                        id="suite"
                                        name="suite"
                                        value={address.suite}
                                        className="rounded-sm focus:outline-none focus:border-2 focus:border-[#61677A] "
                                        onChange={handleAddressChange} 
                                        required />
                                </td>
                            </tr>

                            {/* row for city name in address */}
                            <tr>
                                <td>
                                    <label for="city" className="text-black  font-semibold">
                                        City:
                                    </label>
                                </td>
                                <td>
                                    {/* input bar */}
                                    <input type="text"
                                        id="city"
                                        name="city"
                                        value={address.city}
                                        className="rounded-sm focus:outline-none focus:border-2 focus:border-[#61677A] "
                                        onChange={handleAddressChange} 
                                        required />
                                </td>
                            </tr>

                            {/* row for zipcode in address */}
                            <tr>
                                <td>
                                    {/* label */}
                                    <label for="zipcode" className="text-black  font-semibold">
                                        ZipCode:
                                    </label>
                                </td>
                                <td>
                                    {/* input bar */}
                                    <input type="text"
                                        id="zipcode"
                                        name="zipcode"
                                        value={address.zipcode}
                                        className="rounded-sm focus:outline-none focus:border-2 focus:border-[#61677A] "
                                        onChange={handleAddressChange}
                                        required />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                
            </div>

            {/* button for updating the values */}
            <button className="float-left bg-blue-400 rounded 
                            text-white p-[2px] mt-1 shadow-md" 
                    onClick={handleSubmit}>
                Update
            </button>

            {/* button for delete the contact */}
            <button className="float-right bg-red-500 p-[2px] 
                            rounded text-white mt-1 shadow-md" 
                    onClick={handleDelete}>
                Delete
            </button>
        </>
    )
}


export default UpdateSection;