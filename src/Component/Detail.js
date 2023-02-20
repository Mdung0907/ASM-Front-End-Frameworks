import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ProductDataService from "../componentfirebase/service/product-services.js";
import ProductDataServiceCart from "../componentfirebase/service/product-services-tocart.js";
import { toast } from "react-toastify";
const PostDetail = ({ currentUser }) => {
  const [data, setdata] = useState([])
  const [datacart, setdatacart] = useState([])
  const { id } = useParams();

  useEffect(() => {
    fectProduct();
    fectProductcart()
  }, []);


  const fectProduct = async () => {
    const data2 = await ProductDataService.getProduct(id);
    setdata(data2.data());
  };

  const fectProductcart = async () => {
    const data2 = await ProductDataServiceCart.getAllproductcart();
    console.log(data2.docs);
    setdatacart(data2.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const addToCart = async (e, postid, name, price,category, description, image, usercreate) => {
    e.preventDefault();
    if (currentUser) {
      const cartItems = datacart.filter(
        (item) => item.uid === postid
      );
      if (cartItems.length > 0) {
        const newitem = cartItems.filter(
          (item) => item.usercreate === currentUser.email
        );
        if (newitem.length > 0) {
          newitem.map((item) => {
            console.log('item', item)
            ProductDataServiceCart.updateproduct(item.id, item.quantity + 1)
            toast.success('Thêm thành công')
            fectProductcart()
          })
        } else {
          await ProductDataServiceCart.addproduct(postid, name, price,category, description, image, usercreate)
          toast.success('Thêm thành công')
          fectProductcart()
        }
      } else {
        await ProductDataServiceCart.addproduct(postid, name, price,category, description, image, usercreate)
        toast.success('Thêm thành công')
        fectProductcart()
      }
    }
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
            alert(id)
            addToCart(e,id, data.name, data.price,data.category ,data.description, data.downloadURL, currentUser.email)
          }}>Mua</Button>
        </div>
      </div>
    );
  }
};
export default PostDetail;