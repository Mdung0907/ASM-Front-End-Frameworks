import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import ProductDataServiceHistory from "../service/history-service";
import ProductDataService from "../service/product-services";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
const Historypay = ({ currentUser }) => {
  const [data, setdata] = useState([])
  const [cate, setcate] = useState([])


  useEffect(() => {
    if (currentUser) {
      fectProductcart()
      fectcategory()
    }
  }, []);


  const fectProductcart = async () => {
    const data2 = await ProductDataServiceHistory.getAllproductHistoryEmail(currentUser.email);
    setdata(data2.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const fectcategory = async () => {
    const data2 = await ProductDataService.getAllCategorys()
    setcate(data2.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  // if (currentUser) {
  //   fectProductcart()
  //   fectcategory()
  // }
  if (data.length === 0 || cate.length === 0) {
    return (
      <div style={{ display: 'block', width: 1000, padding: 30, margin: 'auto', textAlign: 'center' }}>
        <Spinner animation="grow" variant="warning" />
      </div>
    )
  }
  function getNameCategory(id) {
    const check = cate.filter((item) => item.id === id)
    return check[0].name;
  }
  return (
    <Container>
      <Row>
        <Col>
          <h2>Lịch sử đã thanh toán</h2>
          <Table>
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Danh mục</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Ngày thanh toán</th>
                <th>Hình ảnh</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{getNameCategory(item.category)}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.datepay}</td>
                  <td><img src={item.image} style={{ width: '100px' }} /></td>
                  <td>
                    <Button onClick={()=>{console.log(item)}}
                    >
                      <Link to={`/detail/${item.uid}`} style={{ textDecoration: 'none',color:'white' }}>Mua lại sản phẩm</Link>
                    </Button>

                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row >

    </Container >
  );
};
export default Historypay;