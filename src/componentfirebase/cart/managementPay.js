import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import ProductDataServiceHistory from "../service/history-service";
import ProductDataService from "../service/product-services";
import Spinner from "react-bootstrap/Spinner";
const ManagementPay = ({ currentUser }) => {
  const [data, setdata] = useState([])
  const [cate, setcate] = useState([])

  useEffect(() => {
    if (currentUser) {
      fectProductcart()
      fectcategory()
    }
  }, []);


  const fectProductcart = async () => {
    const data2 = await ProductDataServiceHistory.getAllproductHistory();
    setdata(data2.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const fectcategory = async () => {
    const data2 = await ProductDataService.getAllCategorys()
    setcate(data2.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
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
          <h2>Quản lí lịch sử thanh toán sản phẩm</h2>
          <Table>
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Danh mục</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
                <th>Ngày thanh toán</th>
                <th>Người thanh toán</th>
                <th>Hình ảnh</th>

              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{getNameCategory(item.category)}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.quantity*item.price}</td>
                  <td>{item.datepay}</td>
                  <td>{item.usercreate}</td>
                  <td><img src={item.image} style={{ width: '100px' }} /></td>

                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row >

    </Container >
  );
};
export default ManagementPay;