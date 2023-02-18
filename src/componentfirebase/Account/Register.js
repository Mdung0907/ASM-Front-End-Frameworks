import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { registerWithEmailAndPassword } from '../../firebase/config';
function FormRegister() {
  const [name, setname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confilmpassword, setconfilmPassword] = useState('')
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false);
  const [ischeckpassword, setischeckpassword] = useState(false);
  const [ischeckconfilmpassword, setischeckconfilmpassword] = useState(false);


  function Checkmk(us) {
    if (us.length < 6 || us.length > 12) {
      setischeckpassword(true)
      return true
    }
    else {
      return false
    }
  }

  function FeedbackErrorPassword() {
    if (ischeckpassword) {
      return (
        <Form.Control.Feedback type="valid" style={{ color: 'red' }}>
          Mật khẩu phải từ 6-12 kí tự.
        </Form.Control.Feedback>
      )
    } else {
      return (
        <Form.Control.Feedback>Tốt!</Form.Control.Feedback>)
    }
  }

  function CheckConfilmPass(mk, mkcon) {
    if (mk !== mkcon) {
      setischeckconfilmpassword(true)
      return true
    }
    else {
      return false
    }
  }

  function FeedbackErrorConfilmPassword() {
    if (ischeckconfilmpassword) {
      return (
        <Form.Control.Feedback type="valid" style={{ color: 'red' }}>
          Nhập lại mật khẩu phải trùng với mật khẩu.
        </Form.Control.Feedback>
      )
    } else {
      return (
        <Form.Control.Feedback>Tốt!</Form.Control.Feedback>)
    }
  }


  return (
    <Form style={{ width: '40%', margin: 'auto', paddingBottom: '3%' }} noValidate validated={validated} onSubmit={(e) => {
      e.preventDefault();
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.stopPropagation();
      } else { if (Checkmk(password) || CheckConfilmPass(password, confilmpassword)) { return } else { registerWithEmailAndPassword(name, email, password);alert('Đăng kí thành công'); navigate('/login') } }
      setValidated(true);
    }
    }>
      <Form.Group className="mb-3" controlId="idname">
        <Form.Label>Tên</Form.Label>
        <Form.Control required type="text" onChange={e => { setname(e.target.value) }} name="name" placeholder="Nguyễn Văn A..." />
        <Form.Control.Feedback type="invalid">
          Vui lòng nhập tên.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="idemail">
        <Form.Label>Email</Form.Label>
        <Form.Control required type="email" onChange={e => { setEmail(e.target.value) }} name="email" placeholder="/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i" />
        <Form.Control.Feedback>Tốt!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Vui lòng nhập Email.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="idpassword">
        <Form.Label>Mật khẩu</Form.Label>
        <Form.Control required type="password" onChange={e => { setPassword(e.target.value) }} name="password" placeholder="6-12 kí tự" onFocus={() => { setischeckpassword(false) }} onBlur={() => { Checkmk(document.getElementById('idpassword').value) }} />
        <Form.Control.Feedback type="invalid">
          Vui lòng nhập mật khẩu.
        </Form.Control.Feedback>
        <FeedbackErrorPassword />
      </Form.Group>

      <Form.Group className="mb-3" controlId="idconfilmpassword">
        <Form.Label>Nhập lại mật khẩu</Form.Label>
        <Form.Control required onChange={e => { setconfilmPassword(e.target.value) }} type="password" placeholder="Nhập lại mật khẩu" onFocus={() => { setischeckconfilmpassword(false) }} onBlur={() => { CheckConfilmPass(document.getElementById('idpassword').value, document.getElementById('idconfilmpassword').value) }} />
        <Form.Control.Feedback type="invalid">
          Vui lòng nhập lại mật khẩu.
        </Form.Control.Feedback>
        <FeedbackErrorConfilmPassword />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check required type="checkbox" label="Tôi đồng ý với tất cả điều khoản và dịch vụ" />
        <Form.Control.Feedback type="invalid">
          Vui lòng đồng ý với các kiểu khoản và dịch vụ của chúng tôi.
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Xác nhận
      </Button>
    </Form>
  );
}

export default FormRegister;