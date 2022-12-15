import { useContext, useEffect, useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import Apis, { endpoints } from '../../configs/Apis';
import "../Header/style.css";
import cookies from 'react-cookies'
import { LogoutUser } from '../../ActionCreators/UserCreators';

export default function Header() {
    const [categories, setCategories] = useState([]);
    const [kw, setKw] = useState("");
    const nav = useNavigate();
    const [user, dispatch] = useContext(UserContext)
    useEffect(() => {
        let loadCategories = async () => {
            let res = await Apis.get(endpoints['categories'])
            setCategories(res.data)
        }
        loadCategories();
    }, []);

    const search = (event) => {
        event.preventDefault();

        nav(`/?kw=${kw}`)

    }
    const logout = (event) => {
        event.preventDefault();
        cookies.remove("access_token")
        cookies.remove("user")
        dispatch(LogoutUser)
    }
    let btn = <>
        <li><Link to="/login" className="nav-link">ĐĂNG NHẬP</Link></li>
        <li><Link to="/register" className="nav-link">ĐĂNG KÝ</Link></li>
    </>
    if (user != null)
        btn = <>
            <li><Link to="/" onClick={logout} className="nav-link">ĐĂNG XUẤT</Link></li>
            <li><Link to="/" className="nav-link">{user.username}</Link></li>
        </>


    return (
        <>
            <div id="main">
                <div id="header">
                    {/* begin nav */}
                    <ul id="nav">
                        <li><Link className="nav-link" to="/">TRANG CHỦ</Link></li>
                        <li><Link className="nav-link" to="#features">GIỚI THIỆU </Link></li>
                        <li><Link className="nav-link" to="#">TIN TỨC</Link></li>
                        <li><Link className="nav-link" to="#">TUYỂN DỤNG </Link></li>
                        <li><Link className="nav-link" to="#">LIÊN HỆ ĐỂ TRỞ THÀNH ĐẠI LÝ</Link></li>
                        <li>
                            <Link className="nav-link" to="/products">SẢN PHẨM

                            </Link>
                            <ul className="subnav">
                                {categories.map(c => {
                                    const url = `/?category_id=${c.id}`
                                    return <li> <Link key={c.id} to={url} className="product">{c.name}</Link></li>
                                })}
                            </ul>
                        </li>

                        {btn}
                    </ul>
                    <Form className="search-btn" onSubmit={search} >
                        <FormControl
                            type="search"
                            value={kw}
                            onChange={event => setKw(event.target.value)}
                            placeholder="Nhập tên sản phẩm..."
                            className="me-2"
                            aria-label="Search" />
                        <Button type="submit" variant="outline-danger">SEARCH</Button>
                    </Form>
                    {/*end nav  */}
                </div>
          

            </div>


            {/* <Navbar id="nav" variant="dark">
             
                    <Navbar.Brand className="icon-home" to="/"><img src='https://files.fm/u/2p3yh6rfcy' width="50px" height="50px" alt='logo'/></Navbar.Brand>
                    <Nav className="me-auto">
                        <Link className="nav-link" to="/">TRANG CHỦ</Link>
                        <Link className="nav-link" to="#features">GIỚI THIỆU </Link>
                        <div className="products nav-link">
                            <p>SẢN PHẨM</p>
                            <ul className="products-detail">
                                {categories.map(c => {
                                    const url = `/?category_id=${c.id}`
                                    return <li> <Link key={c.id} to={url} className="product">{c.name}</Link>
                                    </li>
                                })}
                            </ul>
                        </div>
                        <Link className="nav-link" to="#">TIN TỨC</Link>
                        <Link className="nav-link" to="#">TUYỂN DỤNG </Link>
                        <Link className="nav-link" to="#">LIÊN HỆ ĐỂ TRỞ THÀNH ĐẠI LÝ</Link>
                        <Form className="d-flex" onSubmit={search} >
                            <FormControl
                                type="search"
                                value={kw}
                                onChange={event => setKw(event.target.value)}
                                placeholder="Nhập tên sản phẩm..."
                                className="me-2"
                                aria-label="Search" />
                            <Button type="submit" variant="outline-danger">SEARCH</Button>
                        </Form>
                    </Nav>

            </Navbar> */}

        </>
    )
}