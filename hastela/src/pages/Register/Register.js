import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import Apis, { endpoints } from "../../configs/Apis";

const Register = () => {
    const [userName, setUserName] = useState();
    const [passWord, setPassWord] = useState();
    const [confirmPassword, setComfirmPassword] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const avatar = useRef();
    const nav = useNavigate();
    const register = (event) => {
        event.preventDefault();

        let registerUser = async () => {
            const formData = new FormData();
            formData.append("first_name", firstName)
            formData.append("last_name", lastName)
            formData.append("email", email)
            formData.append("password", passWord)
            formData.append("username", userName)
            formData.append("avatar", avatar.current.files[0])

            try {
                await Apis.post(endpoints['register'], formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                nav(`/login`); 
                
            } catch (error) {
                console.error(error)
            }
          
        }
        if (passWord !== null && passWord === confirmPassword) {
            registerUser();
        }
    }
    return (
        <>
            <h1 className="text-center text-danger">ĐĂNG KÝ NGƯỜI DÙNG</h1>

            <Form onSubmit={register}>
                <RegisterForm id="firstName"
                    label=" First Name"
                    type="text"
                    value={firstName}
                    change={(event) => setFirstName(event.target.value)} />

                <RegisterForm id="lastName"
                    label="Last Name"
                    type="text"
                    value={lastName}
                    change={(event) => setLastName(event.target.value)} />
                <RegisterForm id="userName"
                    label="UserName"
                    type="text"
                    value={userName}
                    change={(event) => setUserName(event.target.value)} />

                <RegisterForm id="passWord"
                    label="PassWord"
                    type="password"
                    value={passWord}
                    change={(event) => setPassWord(event.target.value)} />

                <RegisterForm id="confirmPassword"
                    label="ConfirmPassword"
                    type="password"
                    value={confirmPassword}
                    change={(event) => setComfirmPassword(event.target.value)} />
                <RegisterForm id="email"
                    label="email"
                    type="email"
                    value={email}
                    change={(event) => setEmail(event.target.value)} />

                <Form.Group className="mb-3" controlId="avatar">
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control type="file" ref={avatar} className="form-control" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Đăng ký
                </Button>
            </Form>
        </>

    )
}

function RegisterForm(props) {
    return (
        <Form.Group className="mb-3" controlId={props.id}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control type={props.type}
                placeholder="..."
                value={props.value}
                onChange={props.change} />
        </Form.Group>
    )
}

export default Register