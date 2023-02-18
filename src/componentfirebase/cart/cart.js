import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { callAPI } from '../../Component/API'
const Cart = () => {
  const [data, setdata] = useState([])

  const log = useRef(true)
  useEffect(() => {
    if (log.current) {
      log.current = false
      FectPost()
    }
  }, []);
  const FectPost = async () => {
    try {
      const response = await callAPI(`/products`, "GET");
      setdata(response)
      console.log(response)
    } catch (error) {
      console.error(error);
    }
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
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>{item.quanlity}</td>
                  <td><img src={item.downloadURL} style={{ width: '100px' }} /></td>
                  <td>
                    <Button
                      color="danger"
                      onClick={async () => {
                        await callAPI(`/products/${item.id}`, "DELETE")
                      }}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default Cart;