import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { fetchDataUser } from '../services/UserService';
import ReactPaginate from 'react-paginate'
import ModalAddUser from "./modalAddUser";
import ModalEditUser from './modalEditUser';
import ModalConfirm from './modalConfirm';
import _ from 'lodash'

function TableUser(props) {
    const [listUsers, setListUsers] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const [isShowModalAdd, setIsShowModalAdd] = useState(false)
    const [isShowModalEdit, setIsShowModalEdit] = useState(false)
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)

    const [dataUserEdit, setDataUserEdit] = useState({})
    const [dataUserDelete, setDataUserDelete] = useState({})

    const [sortBy, setSortBy] = useState("asc")
    const [sortField, setSortField] = useState("id")


    const handleCloseModal = () => {
        setIsShowModalAdd(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    }

    const handleUpdateTable = (user) => {
        setListUsers([...listUsers, user])
    }

    const handleEditUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers)
        let index = listUsers.findIndex(item => item.id === user.id)
        cloneListUsers[index].first_name = user.first_name

        setListUsers(cloneListUsers)
        console.log(cloneListUsers);
    }

    const handleDeleteUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers)
        cloneListUsers = cloneListUsers.filter(item => item.id !== user.id)
        setListUsers(cloneListUsers)
        console.log(cloneListUsers);
    }

    async function getUser(page) {
        let res = await fetchDataUser(page);
        if (res && res.data) { //Ktra trường hợp nếu api lỗi thì ứng dụng sẽ ko die
            setListUsers(res.data)
            setTotalUsers(res.total)
            setTotalPages(res.total_pages)
        }
    }
    useEffect(() => {
        getUser(1)
    }, [])
    const handlePageClick = (event) => {
        getUser(+ event.selected + 1) // dấu + để convert string về number
    }

    const handleEditUser = (user) => {
        setDataUserEdit(user)
        setIsShowModalEdit(true);
    }

    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true)
        setDataUserDelete(user)
    }

    const handdleSort = (sortBy, sortField) => {
        setSortBy(sortBy)
        setSortField(sortField)

        let cloneListUsers = _.cloneDeep(listUsers)
        cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy])
        setListUsers(cloneListUsers)
    }

    return (
        <div className='container' >
            <div className="add-new m-3">
                <span><b> List Users</b></span>
                <button className="btn btn-success" onClick={() => setIsShowModalAdd(true)}>Add New User</button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className='sort-header' >
                            <span>ID</span>
                            <span className='ms-2'>
                                <i class="fa-solid fa-down-long" style={{ cursor: 'pointer' }} onClick={() => handdleSort("desc", "id")}></i>
                                <i class="fa-solid fa-up-long ms-2" style={{ cursor: 'pointer' }} onClick={() => handdleSort("asc", "id")}></i>
                            </span>
                        </th>
                        <th className='sort-email'>Email</th>
                        <th className='sort-firstName'>
                            <span>
                                First Name
                            </span>
                            <span className='ms-2'>
                                <i class="fa-solid fa-down-long" style={{ cursor: 'pointer' }} onClick={() => handdleSort("desc", "first_name")}></i>
                                <i class="fa-solid fa-up-long ms-2" style={{ cursor: 'pointer' }} onClick={() => handdleSort("asc", "first_name")}></i>
                            </span></th>
                        <th className='sort-lastName' >Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => (
                            // listUsers.map((item, index) => (  <trong trường hợp k có respone k có id>
                            <tr key={`item-${index}`}>
                                {/* <tr key={`item-${index}`}> */}
                                <td>{item.id}</td>
                                <td>{item.email}</td>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => handleEditUser(item)} >Edit</button>
                                </td>
                                <th>
                                    <button className="btn btn-danger" onClick={() => handleDeleteUser(item)}>Delete</button>
                                </th>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"

                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />

            <ModalAddUser
                show={isShowModalAdd}
                handleClose={handleCloseModal}
                handleUpdateTable={handleUpdateTable}
            />

            <ModalEditUser
                show={isShowModalEdit}
                handleClose={handleCloseModal}
                dataUserEdit={dataUserEdit}
                handleEditUserFromModal={handleEditUserFromModal}
            />

            <ModalConfirm
                show={isShowModalDelete}
                handleClose={handleCloseModal}
                dataUserDelete={dataUserDelete}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
            />

        </div >
    );
}

export default TableUser;