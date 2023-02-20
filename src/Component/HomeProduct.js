import ReactPaginate from "react-paginate";
import { useEffect, useRef, useState } from "react";
import { callAPI } from './API.js'
import { Link } from "react-router-dom";
import SearchBar from "./SearchPosts.js";
import Slide from './Slide'
import ProductDataService from "../componentfirebase/service/product-services.js";
import ProductDataServiceCart from "../componentfirebase/service/product-services-tocart.js";
import { toast } from "react-toastify";
import { Button, Col, Row } from "react-bootstrap";
function Posts({ currentUser }) {
  const [data, setdata] = useState([])
  const [cate, setcate] = useState([])
  const [currentpage, setcurrentpage] = useState(1);
  const [datacart, setdatacart] = useState([])
  const currenPost = data.slice(currentpage * 12 - 12, currentpage * 12)
  const handlePageClick = (event) => {
    const newVal = event.selected;
    setcurrentpage(newVal + 1);
  };
  const log = useRef(true)
  useEffect(() => {
    if (log.current) {
      log.current = false
      fectProduct()
      fectProductcart()
      fectcategory()
    }
  }, []);
  const fectProduct = async () => {
    const data2 = await ProductDataService.getAllProducts();
    console.log(data2.docs);
    setdata(data2.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const fectProductcart = async () => {
    const data2 = await ProductDataServiceCart.getAllproductcart();
    console.log(data2.docs);
    setdatacart(data2.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const fectcategory = async () => {
    const data2=await ProductDataService.getAllCategorys()
    setcate(data2.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
};

function getNameCategory(id){
    const check=cate.filter((item)=>item.id===id)
    return check[0].name
}


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
    }else{
      toast.error('Vui lòng đăng nhập')
      return
    }
  }


  return (
    <div>
      <div>
        <Slide /></div>
      <div className="cuto">
        <div>
          <SearchBar
            placeholder={'Nhập từ khóa tìm kiếm...'}
            data={data}
          />
          <div className="App" >
            {currenPost && currenPost.map((post) => {
              return (
                <div className="img-wrapper" key={post.id} >
                  <img src={post?.downloadURL} />
                  <p className="categorypost">{getNameCategory(post.category)}</p>
                  <p className="name">
                    <Link to={`/detail/${post.id}`} style={{ textDecoration: 'none', color: 'black', fontWeight: '600' }}> {post.name}</Link></p>
                  <p>${post.price}</p>
                  <Button onClick={e => {
                    addToCart(e, post.id, post.name, post.price,post.category, post.description, post.downloadURL, currentUser.email)
                  }}
                  >Mua</Button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="pagination">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Sau >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={Math.ceil(data.length / 12)}
            previousLabel="< Trước"
            renderOnZeroPageCount={null}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </div >
  )

}
export default Posts;