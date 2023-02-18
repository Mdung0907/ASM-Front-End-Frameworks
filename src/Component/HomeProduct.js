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


function Posts({ emailnow }) {
  const [data, setdata] = useState([])
  const [currentpage, setcurrentpage] = useState(1);
  const [dataPRODUCT, setdataPRODUCT] = useState([])
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
      FectPost()
    }
  }, []);
  const fectProduct = async () => {
    const data2 = await ProductDataService.getAllProducts();
    console.log(data2.docs);
    setdata(data2.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
                  <img src={post?.downloadURL}/>
                  <p className="categorypost">Điện thoại</p>
                  <p className="name">
                    <Link to={`/detail/${post.id}`} style={{ textDecoration: 'none', color: 'black', fontWeight: '600' }}> {post.name}</Link></p>
                  <p>${post.price}</p>
                  <Button onClick={e => {
                    Thu(post.id, { ...post, usercreate: emailnow.email }, { ...post, createAt: new Date(), quanlity: 1, tinhtrang: false, usercreate: emailnow.email })
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