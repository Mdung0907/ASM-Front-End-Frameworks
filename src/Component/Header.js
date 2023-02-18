import { useNavigate } from "react-router-dom";
import { BsFillCartFill } from 'react-icons/bs';
import { logout } from "../firebase/config";
import { useState } from "react";
import Posts from "./HomeProduct";

const Header = ({ authen }) => {
    const navigate = useNavigate();
    const [cate, setcate] = useState(1)
    const logoutheadr = () => {
        authen = null
        logout()
        navigate('/')
        window.location.reload()
    };
    function PhanQuyen() {
        if (authen.role === 'admin') {
            return (
                <>
                    <li className="item-lv2">
                        <a className="title-menu-lv2" onClick={() => { navigate('/management') }}>Quản lí sản phẩm
                        </a>
                    </li>
                    <li className="item-lv2">
                        <a className="title-menu-lv2" onClick={() => { navigate('/managementuser') }}>Quản lí tài khoản
                        </a>
                    </li></>)
        }
        else {
            return
        }
    }


    const Profile = () => {
        return (

            authen.length == null ? (
                <li className="item-lv1"><p className="namelocal">{authen.name}</p>
                    <ul className="menu-lv2">
                        <PhanQuyen />
                        <li className="item-lv2">
                            <a className="title-menu-lv2" onClick={() => { navigate('/infomation') }}>Cài đặt tài khoản
                            </a>
                        </li>
                        <li className="item-lv2">
                            <a className="title-menu-lv2" onClick={() => { logoutheadr() }}>Đăng xuất
                            </a>
                        </li>
                    </ul>
                </li>
            )
                : (
                    <button className="btnlogin" onClick={() => navigate("/login")}>Đăng nhập</button>
                )

        )
    }
    return (
        <div>
            <div className="mucluc">
                <div className="logo">
                    <img src="https://www.vsmart.net/themes/porto/img/vinsmart/vsm_logo.svg" alt="" onClick={() => { window.location.href = ('/') }} />
                </div>
                <div className="danhsach">
                    <nav className="menu">
                        <ul className="nameul">
                            <li className="item">
                                <a className="content" onClick={()=>{setcate(1)}}>Điện Thoại  </a>
                            </li>
                            <li className="item">
                                <a className="content" onClick={()=>{setcate(2)}}>TV </a>
                            </li>
                            <li className="item">
                                <a className="content" onClick={()=>{setcate(3)}}>Máy Lọc Không Khí </a>
                            </li>
                            <li className="item">
                                <a className="content" onClick={()=>{setcate(4)}}>SmartHome </a>
                            </li>
                            <li className="item">
                                <a className="content" onClick={()=>{setcate(5)}}>SmartCiTy </a>
                            </li>
                            <li className="item">
                                <a className="content" >Tin Tức </a>
                            </li>
                            <li className="item">
                                <a className="content">Hỗ Trợ</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div style={{ margin: 'auto', width: '3%' }}>
                    <BsFillCartFill fontSize={'30px'} onClick={() => { authen.length == null ? navigate('cart') : navigate('/') }} />
                </div>
                <div className="buttonlogin">
                    <Profile />
                </div>
            </div>
        </div>
    );
}
export default Header;