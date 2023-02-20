
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from "react-bootstrap";
import ProductDataService from "../service/product-services";
import { toast } from 'react-toastify';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
const Update = ({ propsid, isShow, handleClose, onReload }) => {
    const [file, setfile] = useState('');
    const [cate, setcate] = useState([]);
    const [data, setdata] = useState([]);
    const [valuehoi, setvaluehoi] = useState({});
    const [valuemoi, setvaluemoi] = useState({});
    const [categoryid, setcategoryid] = useState('mChLoQuuPQT49p5WZTLw');
    const [categoryname, setcategoryname] = useState('Điện thoại');

    useEffect(() => {
        fectProduct();
        fectCate()
        console.log('id', propsid)
    }, []);

    function onChangeinput(e) {
        setvaluemoi({ ...valuehoi, [e.target.name]: e.target.value })
    }
    const fectCate= async () => {
        const data2 = await ProductDataService.getAllCategorys();
        setcate(data2.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const fectProduct = async () => {
        const data2 = await ProductDataService.getAllProducts();
        console.log(data2.docs);
        setdata(data2.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    function gethehe() {
        const check = data.filter((item) => item.id === propsid)
        if (check.length > 0) {
            setvaluehoi(check[0])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ProductDataService.updateProductsmoi(propsid,valuemoi, file,categoryid);
            console.log('valuemoi',valuemoi,categoryid,file)
            toast.success('Sửa thành công')
            handleClose()
            onReload()
        } catch (err) {
            console.log(err)
        }
    };


    return (
        <>
            <Modal show={isShow} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form >
                        <Form.Group className="mb-3" controlId="idusername">
                            <Form.Label>Tên</Form.Label>
                            <Form.Control onFocus={gethehe} onChange={onChangeinput} name="name" type="text" placeholder="Tên" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="idavatar">
                            <Form.Label>Hình ảnh</Form.Label>
                            <Form.Control onFocus={gethehe} type="file" onChange={e => { setfile(e.target.files[0]) }} name="downloadURL" placeholder="Hình ảnh" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="idprice">
                            <Form.Label>Giá</Form.Label>
                            <Form.Control onFocus={gethehe} type="number" onChange={onChangeinput} name="price" placeholder="Giá" />
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
                            <Form.Control onFocus={gethehe} onChange={onChangeinput} name="description" as="textarea" placeholder="Mô tả" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={e => { handleClose(); }}>
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

export default Update;