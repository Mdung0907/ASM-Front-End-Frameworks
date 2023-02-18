import Button from 'react-bootstrap/Button';
import React, { useRef, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import AccountDataService from '../service/account-service'

const UpdateUser = ({ isShow, handleClose, propid, onReload }) => {
    const [user, setuser] = useState([]);
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [auth, setauth] = useState('');
    const [role, setrole] = useState('');

    const newAccount = {
        auth,
        email,
        name,
        password,
        role
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (propid !== undefined && propid !== "") {
                await AccountDataService.updateAccounts(propid, newAccount);
                alert('Cập nhật thành công')
                window.location.reload()
            }
        } catch (err) {

        }
    };

    const editHandler = async () => {
        try {
            const docSnap = await AccountDataService.getAccount(propid);
            console.log("the record is :", docSnap.data());
            setname(docSnap.data().name);
            setemail(docSnap.data().email);
            setpassword(docSnap.data().price);
            setauth(docSnap.data().authProvider);
            setrole(docSnap.data().role);
        } catch (err) {
        }
    };
    useEffect(() => {
        console.log("The id here is : ", propid);
        if (propid !== undefined && propid !== "") {
            editHandler();
        }
    }, [propid]);
    return (
        <>
            <Modal show={isShow} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật tài khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="idten">
                            <Form.Label>Tên</Form.Label>
                            <Form.Control onChange={e => { setname(e.target.value) }} name="name" type="text" placeholder="Tên" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="idmk">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control onChange={e => { setpassword(e.target.value) }} type="password" name="password" placeholder="Mật khẩu" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="idemail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control onChange={e => { setemail(e.target.value) }} type='email' name="email" placeholder="Email" />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateUser;