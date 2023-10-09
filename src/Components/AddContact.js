import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { contactSelector, addContactThunk } from "../Redux/Reducers/contactReducer";

const AddContact = () => {
    const dispatch = useDispatch();
    const [isChanged, setIsChanged] = useState(false);
    const { contactList } = useSelector(contactSelector);

    const inputStructure = {
        id: `${contactList.length}`,
        name: '',
        email: '',
        phone: '',
        address: {
            suite: '',
            city: '',
            zipcode: ''
        }
    };

    const [formData, setFormData] = useState(inputStructure);
    const [address, setAddress] = useState(inputStructure.address);

    const handleSubmit = (e) => {
        if (!isChanged) {
            toast.error('Nothing to add in the list');
            return;
        }

        if (formData.name === '' || formData.phone === '') {
            toast.error('Name / Phone cannot be empty');
            return;
        }

        e.preventDefault();
        dispatch(addContactThunk(formData));
        toast.success('A new contact is Added !!');
        setIsChanged(false);
    }

    const handleChange = (e) => {
        if (!isChanged) {
            setIsChanged(true);
        }

        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleAddressChange = (e) => {
        if (!isChanged) {
            setIsChanged(true);
        }

        const { name, value } = e.target;

        setAddress({
            ...address,
            [name]: value,
        });

        setFormData({
            ...formData,
            address: {
                ...address,
                [name]: value
            }
        });
    }

    const handleReset = (e) => {
        e.preventDefault();
        setIsChanged(false);
        setFormData(inputStructure);
        setAddress(inputStructure.address);
        toast.success('Entered data is removed !!');
    }


    // render the section
    return(
    <>
        {/* container div with padding and border radius */}
        <div className="w-full bg-gray-100 p-4 rounded-lg shadow-lg">
    <form>
        <table className="border-collapse w-full">

            <tbody>
                <tr>
                    <td className="pr-4">
                        <label htmlFor="name" className="text-gray-800 font-semibold">
                            Name:
                        </label>
                    </td>
                    <td>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            className="rounded-md focus:outline-none focus:border-[#6a88ee] px-2 py-1 border border-gray-300 text-black "
                            onChange={handleChange}
                            required
                        />
                    </td>
                </tr>

                <tr>
                    <td className="pr-4">
                        <label htmlFor="phone" className="text-gray-800 font-semibold">
                            Phone:
                        </label>
                    </td>
                    <td>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="rounded-md focus:outline-none focus:border-[#6a88ee] px-2 py-1 border border-gray-300 text-black "
                            required
                        />
                    </td>
                </tr>

                <tr>
                    <td className="pr-4">
                        <label htmlFor="email" className="text-gray-800 font-semibold">
                            Email:
                        </label>
                    </td>
                    <td>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            className="rounded-md focus:outline-none focus:border-[#6a88ee] px-2 py-1 border border-gray-300 text-black "
                            onChange={handleChange}
                            required
                        />
                    </td>
                </tr>

                <tr>
                    <td colSpan={2} className="pb-2">
                        <label className="text-gray-800 font-semibold">
                            Address
                        </label>
                    </td>
                </tr>

                <tr>
                    <td className="pr-4">
                        <label htmlFor="suite" className="text-gray-800 font-semibold">
                            H. No.:
                        </label>
                    </td>
                    <td>
                        <input
                            type="text"
                            id="suite"
                            name="suite"
                            value={address.suite}
                            className="rounded-md focus:outline-none focus:border-[#6a88ee] px-2 py-1 border border-gray-300 text-black "
                            onChange={handleAddressChange}
                            required
                        />
                    </td>
                </tr>

                <tr>
                    <td className="pr-4">
                        <label htmlFor="city" className="text-gray-800 font-semibold">
                            City:
                        </label>
                    </td>
                    <td>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={address.city}
                            className="rounded-md focus:outline-none focus:border-[#6a88ee] px-2 py-1 border border-gray-300 text-black "
                            onChange={handleAddressChange}
                            required
                        />
                    </td>
                </tr>

                <tr>
                    <td className="pr-4">
                        <label htmlFor="zipcode" className="text-gray-800 font-semibold">
                            ZipCode:
                        </label>
                    </td>
                    <td>
                        <input
                            type="text"
                            id="zipcode"
                            name="zipcode"
                            value={address.zipcode}
                            className="rounded-md focus:outline-none focus:border-[#6a88ee] px-2 py-1 border border-gray-300 text-black "
                            onChange={handleAddressChange}
                            required
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </form>
</div>

<button className="bg-[#0070c9] text-white py-2 px-4 mt-2 rounded-lg shadow-md" onClick={handleSubmit}>
    Add Contact
</button>

<button className="bg-red-500 text-white py-2 px-4 mt-2 ml-2 rounded-lg shadow-md" onClick={handleReset}>
    Reset
</button>

    </>
    )
}

export default AddContact;