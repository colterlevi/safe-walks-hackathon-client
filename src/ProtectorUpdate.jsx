import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const ProtectorUpdate = () => {

    const [formStep, setFormStep] = useState("contact")
    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [gender, setGender] = useState("")
    const [picture, setPicture] = useState("")


    const navigate = useNavigate()

    const handleUpdate = (e) => {
        e.preventDefault();


        const newProtectorInfo = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            address: address,
            phone_number: phone,
            picture: picture,
            gender_identity: gender,
        }

        const changeProtector = async () => {
            let req = await fetch('http://localhost:3000/protectors', {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newProtectorInfo),
            })

        }
        changeProtector()
        navigate('/openrequests')
    }



    return (
        <div className="bg-slate-100 bg-opacity-75">
            <h2>UPDATE INFO</h2>
            <form onSubmit={(e) => { handleUpdate(e) }}>
                {
                    <div>
                        <h2>Update Login Info</h2>
                        <input className="input-field" onChange={(e) => { setFirstName(e.target.value) }} type="text" placeholder="FIRST NAME" /><br />
                        <input className="input-field" onChange={(e) => { setLastName(e.target.value) }} type="text" placeholder="LAST NAME" /><br />
                        <input className="input-field" onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="EMAIL" /><br />
                        <input className="input-field" onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="NEW PASSWORD" /><br />                        
                    </div>
                }
                {
                    <div>
                        <h2>Update Personal & Contact Info</h2>
                        <label>Phone Number:</label>
                        <input onChange={(e) => { setPhone(e.target.value) }} type="tel" placeholder="000-000-0000" /><br />
                        <label>New Address:</label>
                        <input onChange={(e) => { setAddress(e.target.value) }} type="text" /><br />
                        <label>Change Profile Photo:</label>
                        <input onChange={(e) => { setPicture(e.target.value) }} type="text" /><br />
                        <label>Gender Identity:</label>
                        <select onChange={(e) => { setGender(e.target.value) }} type="text">
                            <option value="" disabled selected>GENDER</option>
                            <option>MALE</option>
                            <option>FEMALE</option>
                            <option>OTHER</option>
                        </select><br />
                        <input type="submit" />
                    </div>
                }
            </form>
        </div>
    )
}

export default ProtectorUpdate