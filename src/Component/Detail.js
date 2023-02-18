import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ProductDataService from "../componentfirebase/service/product-services.js";
import { callAPI } from './API.js'
import { toast } from "react-toastify";
const PostDetail = ({ emailnow }) => {
  const [data, setdata] = useState([])
  const [dataPRODUCT, setdataPRODUCT] = useState([])
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fectProduct();
    FectPost()
  }, []);


  const fectProduct = async () => {
    const data = await ProductDataService.getProduct(id);
    setdata(data.data())
    setLoading(false);
  };

  const FectPost = async () => {
    try {
      const response = await callAPI(`/products`, "GET");
      setdataPRODUCT(response)
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  }

  function Thu(postid, postupdate, postcreate) {
    const check = dataPRODUCT.filter((item) => item.id == postid)
    if (check.length > 0) {
      UpdatePost(postid, { ...postupdate, ['quanlity']: check[0].quanlity + 1 })

    } else {
      createPost(postcreate)
    }
  }

  const createPost = async (post) => {
    try {
      const response = await callAPI(`/products/`, "POST", post);
      if (response) {
        toast.success('Thêm thành công')
        FectPost()
      }
    } catch (error) {
      console.error(error);
    }
  }
  const UpdatePost = async (id, post) => {
    try {
      const response = await callAPI(`/products/${id}`, "PUT", post);
      if (response) {
        toast.success('Thêm thành công')
        FectPost()
      }

    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    <Row>
      <h1>loading</h1>
    </Row>;
  }
  if (data) {
    return (
      <div className="img-detail">
        <div className="detailimg">
          <img
            src={`${data.downloadURL || "https://via.placeholder.com/150"} `}
            alt=""
          /></div>
        <div className="detail">
          <p style={{ fontWeight: "bold", marginBottom: 5 }}>Tên sản phẩm: {data.name}</p>
          <p style={{ textDecoration: ' underline' }}>Giá: {data.price}$
          </p>
          <p>Mô tả: {data.desciption}
            {data.description}
          </p>

          <Button onClick={e => {
            Thu(data.id, { ...data, usercreate: emailnow.email }, { ...data, createAt: new Date(), quanlity: 1, tinhtrang: false, usercreate: emailnow.email })
          }}>Mua</Button>
        </div>
      </div>
    );
  }
};
export default PostDetail;