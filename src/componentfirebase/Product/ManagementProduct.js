import Table from 'react-bootstrap/Table';
import { useEffect, useRef, useState } from "react";
import AddProduct from './CreateProduct.js';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import ProductDataService from "../service/product-services";
import Update from './UpdateProduct.js';
import { toast } from 'react-toastify';

function ManageMent({current}) {
    const [datanew, setdata] = useState([])
    const [cate, setcate] = useState({})
    const [isOpenCreate, setisOpenCreate] = useState(false);
    const [isOpenUpdate, setisOpenUpdate] = useState(false);
    const [wordEntered, setWordEntered] = useState("");
    const [proid, setproid] = useState("");
    const log = useRef(true)
    useEffect(() => {
        if (log.current) {
            log.current = false
            fectProduct()
        }
    }, []);

    const fectProduct = async () => {
        const data = await ProductDataService.getAllProducts();
        setdata(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };


    const deleteHandler = async (proid) => {
        await ProductDataService.deleteProduct(proid);
        toast.success('Đã xóa')
        fectProduct();
    };


    const fectProductdesc = async () => {
        const data = await ProductDataService.getAllProductsdesc();
        setdata(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const fectProductasc = async () => {
        const data = await ProductDataService.getAllProductsasc();
        setdata(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };


    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = datanew.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            fectProduct()
        } else {
            setdata(newFilter);
        }

    };


    return (
        <div style={{ marginTop: '2%' }}>
            <div style={{ fontWeight: '600', fontSize: '22px', marginBottom: '1%' }}>Quản lý sản phẩm</div>
            <div>
                <input style={{ width: '20%' }}
                    type="search"
                    placeholder='Nhập từ khóa tìm kiếm...'
                    value={wordEntered}
                    onChange={handleFilter}
                ></input>
            </div>
            <div className="buttonmanagement" style={{ float: 'right' }}>
                <button onClick={() => setisOpenCreate(!isOpenCreate)}>Tạo mới</button>
                <AddProduct current={current} isShow={isOpenCreate}
                    handleClose={() => setisOpenCreate(false)
                    } id={proid} 
                    Reload={fectProduct}
                />
                <Update propsid={proid} isShow={isOpenUpdate}
                    handleClose={() => setisOpenUpdate(false)}  onReload={fectProduct}
                />
                <button onClick={fectProductasc}>Sắp xếp tăng theo giá</button>
                <button onClick={fectProductdesc}>Sắp xếp giảm theo giá</button>

            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Hình ảnh</th>
                        <th>Giá</th>
                        <th>Danh mục</th>
                        <th>Mô tả</th>
                        <th>Chỉnh sửa</th>
                    </tr>
                </thead>
                <tbody>
                    {datanew && datanew.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td width='10%'>{item.name}</td>
                                <td width="10%"><img src={item.downloadURL} width="100%" /></td>
                                <td width='10%'>{item.price}</td>
                                <td width='10%'>{item.category}</td>
                                <td width='50%'>{item.description}</td>
                                <td width={'10%'} style={{ textAlign: 'center' }}><AiFillDelete onClick={(e) => { setproid(item?.id); deleteHandler(item?.id) }}
                                    style={{ fontSize: '30px' }} ></AiFillDelete>
                                    <BiEdit style={{ fontSize: '30px', marginLeft: '10px' }}
                                        onClick={
                                            () => {
                                                setproid(item?.id)
                                                setisOpenUpdate(!isOpenUpdate)
                                    
                                            }
                                        }
                                    >
                                    </BiEdit></td>

                            </tr>)
                    })}

                </tbody>
            </Table>
        </div>
    )
}
export default ManageMent