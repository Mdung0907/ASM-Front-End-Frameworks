import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { useEffect, useState, useRef } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import AccountDataService from '../service/account-service'
import { auth } from '../../firebase/config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

function Information({ currentUser }) {
    const [ischeck, setischeck] = useState(false)
    const [ttcu, setttcu] = useState('')
    const [getname, setgetname] = useState('')
    function submit() {
        try {
            toast.success('Thành công!')
            if (getname == 'name') {
                updateProfile(auth.currentUser, { displayName: document.getElementById('formBasic').value }).then(() => {
                })
            }
            else if (getname == 'email') {
                updateEmail(auth.currentUser, document.getElementById('formBasic').value).then(() => {
                })
            }
            else {
                updatePassword(auth.currentUser, document.getElementById('formBasic').value).then(() => {
                })
            }
            AccountDataService.updateAccounts(currentUser.id, { ...currentUser, [getname]: document.getElementById('formBasic').value });
            setTimeout(() => {
                window.location.reload()
            }, 1200)
        } catch (error) {
            toast.error('Có lỗi xảy ra')
        }





    }

    function CheckRoleButton() {
        if (currentUser.role === 'admin') {
            return
        } else {
            return (
                <button style={{ color: 'red' }} onClick={async () => {
                }}>Xóa tài khoản</button>
            )
        }
    }

    const Profile = () => {
        if (ischeck) {
            return (
                <div className='changeinfo'>
                    <Form >
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Nhập dữ liệu {ttcu} mới</Form.Label>
                            <Form.Control placeholder='Nhập thông tin' type="text" />
                        </Form.Group>
                        <Button variant="primary" onClick={submit}>
                            Lưu
                        </Button>
                    </Form>
                </div>
            )
        }

    }

    return (
        <>
            <Table striped bordered hover variant="dark" >
                <tbody className='in4'>
                    <tr >
                        <td>Tên</td>
                        <td>{currentUser.name}</td>
                        <td onClick={() => { setischeck(true); setttcu('Tên'); setgetname('name') }}>Chỉnh sửa</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{currentUser.email}</td>
                        <td onClick={() => { setischeck(true); setttcu('Email'); setgetname('email') }}>Chỉnh sửa</td>
                    </tr>
                    <tr>
                        <td>Mật khẩu</td>
                        <td>{currentUser.password}</td>
                        <td onClick={() => { setischeck(true); setttcu('Mật khẩu'); setgetname('password'); }}>Chỉnh sửa</td>
                    </tr>

                </tbody>
            </Table>
            <CheckRoleButton />

            <Profile />
        </>
    )
}
export default Information;