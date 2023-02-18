import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  logInWithEmailAndPassword,
} from "../../firebase/config";
function FormLogin() {
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  return (
    <Form style={{ width: '40%', margin: 'auto', paddingBottom: '3%' }} noValidate validated={validated} onSubmit={(event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
      } else {
        logInWithEmailAndPassword(email, password)
        navigate('/')
      }
      setValidated(true)
    }}>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control required type="email" placeholder="Nhập Email" onChange={e => { setEmail(e.target.value) }} />
        <Form.Control.Feedback type="alid">
        </Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Vui lòng nhập email.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Mật khẩu</Form.Label>
        <Form.Control required type="password" placeholder="Nhập mật khẩu" onChange={e => { setpassword(e.target.value) }} />
        <Form.Control.Feedback type="invalid">
        </Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Vui lòng nhập mật khẩu.
        </Form.Control.Feedback>
      </Form.Group>


      <Link to={'/register'} style={{ color: 'black', textDecoration: 'none' }}>Đăng kí tài khoản</Link>
      <br></br>
      <br></br>
      <Button variant="primary" type="submit">
        Đăng nhập
      </Button>
    </Form >
  );

}
export default FormLogin;