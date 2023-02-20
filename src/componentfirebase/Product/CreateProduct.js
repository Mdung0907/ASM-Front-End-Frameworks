
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from "react-bootstrap";
import ProductDataService from "../service/product-services";
import { toast } from 'react-toastify';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { isEmpty } from '@firebase/util';

const AddProduct = ({ current, isShow, handleClose, Reload }) => {
    const [cate, setcate] = useState([]);
    const [name, setname] = useState('');
    const [file, setfile] = useState('');
    const [price, setprice] = useState('');
    const [categoryid, setcategoryid] = useState('mChLoQuuPQT49p5WZTLw');
    const [categoryname, setcategoryname] = useState('Điện thoại');
    const [description, setdescription] = useState('');

    useEffect(() => {
        fectCate()
    }, []);

    const fectCate= async () => {
        const data2 = await ProductDataService.getAllCategorys();
        setcate(data2.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name === "" || price === "" || categoryid === "" || description === ""||file==='') {
            toast.error('Điền thông tin')
            return;
        }
        else {
            try {
                await ProductDataService.addProducts(name, file, price, categoryid, description, current.email);
                toast.success('Tạo thành công')
                handleClose()
                Reload()
            } catch (err) {
            }
        }
    };

    return (
        <>
            <Modal show={isShow} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tạo mới sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form >
                        <Form.Group className="mb-3" controlId="idusername">
                            <Form.Label>Tên</Form.Label>
                            <Form.Control onChange={e => { setname(e.target.value) }} name="name" type="text" placeholder="Tên" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="idavatar">
                            <Form.Label>Hình ảnh</Form.Label>
                            <Form.Control type="file" onChange={e => { setfile(e.target.files[0]) }} name="avatar" placeholder="Hình ảnh" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="idprice">
                            <Form.Label>Giá</Form.Label>
                            <Form.Control type="number" onChange={e => { setprice(e.target.value) }} name="price" placeholder="Giá" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="idcategory">
                            <Form.Label>Danh mục</Form.Label>
                            {/* <Form.Control type="text" onChange={e => { setcategory(e.target.value) }} name="category" placeholder="Danh mục" /> */}
                            <DropdownButton id="dropdown-basic-button" title={categoryname}>
                                {cate.map((e) => {
                                    return (
                                        <div key={e.id}>
                                            <Dropdown.Item onClick={() => { setcategoryid(e.id); setcategoryname(e.name) }}>{e.name}</Dropdown.Item>
                                        </div>
                                    )
                                })}
                            </DropdownButton>

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="iddescription">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control onChange={e => { setdescription(e.target.value) }} name="description" as="textarea" placeholder="Mô tả" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button type='Submit' variant="primary" onClick={handleSubmit}>
                        Tạo
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddProduct;