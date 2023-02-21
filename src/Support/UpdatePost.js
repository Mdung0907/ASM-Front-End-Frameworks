import Button from 'react-bootstrap/Button';
import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { callAPI } from './API.js'


const UpdatePost = ({ isShow, handleClose, propid, onReload }) => {
    const [post, setpost] = useState({});

    useEffect(() => {
        if (isShow) {
            FectPost()
        }else{
            return
        }

    }, [isShow]);
    const FectPost = async () => {
        try {
            const data = await callAPI(`/posts/${propid}`, "GET");
            setpost(data)
        } catch (error) {

        }

    }

    const OnchangeInput = (event) => {
        setpost({ ...post, [event.target.name]: event.target.value });
    }


    const onHandleSubmit = async () => {
        const data = await callAPI(`/posts/${propid}`, "PUT", post);
        if (data) {
            alert("Cập nhật thành công")
            handleClose();
            onReload()
        } else {
            alert('Có lỗi xảy ra!')
        }


    }


    return (
        <>
            <Modal show={isShow} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Tên</Form.Label>
                            <Form.Control onChange={OnchangeInput} name="name" type="text" placeholder="Tên" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Hình ảnh</Form.Label>
                            <Form.Control onChange={OnchangeInput} name="avatar" type="text" placeholder="Hình ảnh" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="idprice">
                            <Form.Label>Giá</Form.Label>
                            <Form.Control type="number" onChange={OnchangeInput} name="price" placeholder="Giá" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control onChange={OnchangeInput} name="description" as="textarea" placeholder="Mô tả" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={onHandleSubmit
                    }>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdatePost;