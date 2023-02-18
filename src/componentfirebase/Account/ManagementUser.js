import Table from 'react-bootstrap/Table';

import { useEffect, useRef, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import UpdateUser from './UpdateUser.js';
import AccountDataService from '../service/account-service.js';


function ManageMentUser() {
    const [wordEntered, setWordEntered] = useState('');
    const [data, setdata] = useState([])
    const [isOpenUpdate, setisOpenUpdate] = useState(false);
    const [id, setid] = useState("");
    const log = useRef(true)
    useEffect(() => {
        if (log.current) {
            log.current = false
            fectaccount()
            console.log(id)
        }
    }, []);

    const fectaccount = async () => {
        const data = await AccountDataService.getAllAccounts();
        console.log(data.docs);
        setdata(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const deleteHandler = async (proid) => {
        await AccountDataService.deleteAccount(proid);
        fectaccount();
    };
    // const SortASC = async () => {
    //     try {
    //         const response = await callAPI(`/users?_sort=name&_order=asc`, "GET");
    //         setdata(response)
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // const SortDESC = async () => {
    //     try {
    //         const response = await callAPI(`/users?_sort=name&_order=desc`, "GET");
    //         setdata(response)
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // const handleFilter = (event) => {
    //     const searchWord = event.target.value;
    //     setWordEntered(searchWord);
    //     const newFilter = data.filter((value) => {
    //         return value.name.toLowerCase().includes(searchWord.toLowerCase());
    //     });

    //     if (searchWord === "") {
    //         FectPost()
    //     } else {
    //         setdata(newFilter);
    //     }

    // };
    return (
        <div style={{marginTop:'2%'}}>
            <div style={{ fontWeight: '600', fontSize: '22px', marginBottom: '1%' }}>Quản lý tài khoản</div>
            <div className='Search'>
                {/* <input
                    type="search"
                    value={wordEntered}
                    placeholder='Nhập từ khóa tìm kiếm...'
                    onChange={handleFilter}
                ></input> */}
            </div>
            <div className="buttonmanagement" style={{ float: 'right' }}>
                <UpdateUser 
                    isShow={isOpenUpdate}
                    handleClose={() => setisOpenUpdate(false)}
                    propid={id}
                    onReload={fectaccount}
                />
                {/* <button onClick={SortASC}>Sắp xếp tăng theo tên</button>
                <button onClick={SortDESC}>Sắp xếp giảm theo tên</button> */}

            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Mật khẩu</th>
                        <th>Email</th>
                        <th>Chỉnh sửa</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td width='20%'>{item.name}</td>
                                <td width='20%'>{item.password}</td>
                                <td width='20%'>{item.email}</td>
                                <td width={'10%'} style={{textAlign:'center'}}><AiFillDelete onClick={async () => {
                                    deleteHandler(item.id)

                                }} style={{ cursor: 'pointer' }} fontSize='25px'></AiFillDelete>
                                    <BiEdit style={{ cursor: 'pointer',marginLeft:'15px' }} fontSize='25px'
                                        onClick={
                                            () => {
                                                setid(item.id)
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
export default ManageMentUser