import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Apis, { endpoints } from '../../configs/Apis';
import cookies from 'react-cookies'
import { UserContext } from '../../App';
import { LoginUser } from '../../ActionCreators/UserCreators';
import { Navigate } from 'react-router-dom';

const Login =  () => {
    const [userName, setUserName] = useState();
    const [passWord, setPassWord] = useState();
    const [user, dispatch] = useContext(UserContext)

    const login = async (event) => {
        event.preventDefault()
        try {
            let info = await Apis.get(endpoints['oauth2-info'])    
            let res = await Apis.post(endpoints['login'], {
                "client_id": info.data.client_id,
                "client_secret": info.data.client_secret,
                "username": userName,
                "password": passWord,
                "grant_type": "password"
            })      
            cookies.save("access_token", res.data.access_token)  
            let user = await Apis.get(endpoints['current-user'], {
                headers: {
                    'Authorization': `Bearer ${cookies.load("access_token")}` 
                }
            })
            console.info(user.data)
            cookies.save("user", user.data)
            dispatch(LoginUser(user.data))
        } catch (error) {
            console.error(error);
        }
    }
    
    if (user != null)
        return <Navigate to="/" />

    return (
        <>
            <h1 className="text-center text-danger"> Login Page</h1>

            <Form onSubmit={login}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>UserName</Form.Label>
                    <Form.Control type="text"
                        placeholder="Enter Username..."
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)} />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                        placeholder="Password"
                        value={passWord}
                        onChange={(event) => setPassWord(event.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Đăng nhập
                </Button>
            </Form>
        </>
    )
}
export default Login