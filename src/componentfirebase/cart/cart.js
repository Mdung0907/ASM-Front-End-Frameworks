import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import ProductDataServiceCart from "../service/product-services-tocart";
import ProductDataService from "../service/product-services";
const Cart = ({ currentUser }) => {
  const [data, setdata] = useState([])
  const [cate, setcate] = useState([])
  useEffect(() => {
    fectProductcart()
    fectcategory()
  }, []);

  const fectProductcart = async () => {
    const data2 = await ProductDataServiceCart.getAllproductcartEmail(currentUser.email);
    console.log(data2.docs);
    setdata(data2.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const fectcategory = async () => {
    const data2 = await ProductDataService.getAllCategorys()
    setcate(data2.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  function getNameCategory(id) {
    const check = cate.filter((item) => item.id === id)
    return check[0].name
  }

  return (
    <Container>
      <Row>
        <Col>
          <h2>Giỏ hàng</h2>
          <Table>
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Danh mục</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Hình ảnh</th>
                <th></th>
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
                  <td><img src={item.image} style={{ width: '100px' }} /></td>
                  <td>
                    <Button
                      onClick={async () => {
                        await ProductDataServiceCart.deleteProduct(item.id)
                        fectProductcart()
                      }}
                    >
                      Xóa
                    </Button>

                  </td>
                  <td>
                    <Button
                      onClick={async () => {

                      }}
                    >
                      Thanh toán
                    </Button>

                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Row style={{
          margin: 'auto'
        }}><Button style={{ width: '15%', marginRight: '1000000px' }}>Thanh toán tất cả</Button></Row>
      </Row>

    </Container >
  );
};
export default Cart;