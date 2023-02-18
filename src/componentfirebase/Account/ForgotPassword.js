import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { sendPasswordReset } from "../../firebase/config";
function FormForgot() {
  const [email, setEmail] = useState('')
  const [validated, setValidated] = useState(false)

  return (
    <Form style={{ width: '40%', margin: 'auto', paddingBottom: '3%' }} noValidate validated={validated} onSubmit={(event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
      } else {
        sendPasswordReset(email)
      }
      setValidated(true)
    }}>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control required type="email" placeholder="Nhập Email" onChange={e => { setEmail(e.target.value) }} />
        <Form.Control.Feedback>
        </Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Vui lòng nhập email.
        </Form.Control.Feedback>
      </Form.Group>

      <br></br>
      <Link to={'/login'} style={{ color: 'black', textDecoration: 'none' }}>Bạn đã có tài khoản? Đăng nhập ngay</Link>
      <br></br>
      <Button variant="primary" type="submit">
        Xác nhận
      </Button>
    </Form >
  );

}
export default FormForgot;