import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { fetchDataUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddUser from "./modalAddUser";
import ModalEditUser from "./modalEditUser";
import ModalConfirm from "./modalConfirm";
import _, { debounce } from "lodash";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
import Papa from "papaparse";
import { useAppSelector } from "../stores/store";
import { useDispatch } from "react-redux";
import {
  getListUsers,
  getTotalUsers,
  getTotalPages,
  getIsShowModalAdd,
  getIsShowModalEdit,
  getIsShowModalDelete,
  getDataUserEdit,
  getDataUserDelete,
  getSortBy,
  getSortField,
  getDataExport,
} from "../reducers/tableSlice";
import { ApiResponse } from "../services/UserService";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}
function TableUser(props: any) {
  const {
    listUsers,
    totalPages,
    isShowModalAdd,
    isShowModalEdit,
    isShowModalDelete,
    dataUserEdit,
    dataUserDelete,
    dataExport,
  } = useAppSelector((state) => state.tableReducer);

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(getIsShowModalAdd(false));
    dispatch(getIsShowModalEdit(false));
    dispatch(getIsShowModalDelete(false));
  };

  const handleUpdateTable = (user: User) => {
    dispatch(getListUsers([...listUsers, user]));
  };

  const handleEditUserFromModal = (user: User) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => item.id === user.id);
    cloneListUsers[index].first_name = user.first_name;

    dispatch(getListUsers(cloneListUsers));
    console.log(cloneListUsers);
  };

  const handleDeleteUserFromModal = (user: User) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);
    dispatch(getListUsers(cloneListUsers));
    console.log(cloneListUsers);
  };

  async function getUser(page: number) {
    let res = (await fetchDataUser(page)) as ApiResponse;
    if (res && res.data) {
      //Ktra trường hợp nếu api lỗi thì ứng dụng sẽ ko die
      dispatch(getListUsers(res.data));
      dispatch(getTotalUsers(res.total));
      dispatch(getTotalPages(res.total_pages));
    }
    console.log(res);
  }

  useEffect(() => {
    getUser(1);
  }, []);
  const handlePageClick = (event: { selected: number }) => {
    getUser(+event.selected + 1); // dấu + để convert string về number
  };

  const handleEditUser = (user: User) => {
    dispatch(getDataUserEdit(user));
    dispatch(getIsShowModalEdit(true));
  };

  const handleDeleteUser = (user: User) => {
    dispatch(getIsShowModalDelete(true));
    dispatch(getDataUserDelete(user));
  };

  const handleSort = (sortBy: "asc" | "desc", sortField: string) => {
    dispatch(getSortBy(sortBy));
    dispatch(getSortField(sortField));

    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
    dispatch(getListUsers(cloneListUsers));
  };

  const handleSearch = debounce((event) => {
    let term = event.target.value;
    if (term) {
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = cloneListUsers.filter((item) =>
        item.email.includes(term)
      );
      dispatch(getListUsers(cloneListUsers));
    } else {
      getUser(1);
    }
  }, 800);

  const getUserExport = (event: any, done: () => void) => {
    let result = [];
    if (listUsers && listUsers.length > 0) {
      result.push(["Id", "Email", "First name", "Last Name"]);
      listUsers.map((item) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });
      dispatch(getDataExport(result));
      done(); // done: báo đã xử lý xong hàm async
    }
  };

  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      let file = event.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("Only accept CSV file");
        return;
      }
      // Parse local CSV file
      Papa.parse(file, {
        // header: true,
        complete: function (results: any) {
          let rawCSV = results.data;
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 3) {
              if (
                rawCSV[0][0] !== "email" ||
                rawCSV[0][1] !== "first_name" ||
                rawCSV[0][2] !== "last_name"
              ) {
                toast.error("Wrong format Header on CSV file");
              } else {
                console.log(rawCSV);
                let result: User[] = [];
                rawCSV.map((item: any[], index: number) => {
                  if (index > 0 && item.length === 3) {
                    let obj: User = {} as User;
                    obj.email = item[0];
                    obj.first_name = item[1];
                    obj.last_name = item[2];
                    result.push(obj);
                  }
                });
                dispatch(getListUsers(result));
              }
            } else {
              toast.error("Wrong format on CSV file");
            }
          } else toast.error("Not Found data on CSV file");
        },
      });
      console.log(file);
    }
  };

  return (
    <div className="container">
      <div className="add-new m-3">
        <span>
          <b> List Users</b>
        </span>
        <div>
          <label htmlFor="test" className="btn btn-warning">
            <i className="fa-solid fa-file-import"></i> Import
          </label>
          <input
            id="test"
            type="file"
            hidden
            onChange={(event) => handleImportCSV(event)}
          />
          <CSVLink
            data={dataExport}
            filename={"users.csv"}
            asyncOnClick={true} //asyncOnClick: Chờ hàm onClick thực hiện xong thì mới get data
            onClick={getUserExport}
            className="btn btn-primary ms-2"
          >
            <i className="fa-solid fa-download"></i> Export
          </CSVLink>

          <button
            className="btn btn-success ms-5"
            onClick={() => dispatch(getIsShowModalAdd(true))}
          >
            Add New User
          </button>
        </div>
      </div>
      <div className="col-md-6 my-3">
        <input
          className="form-control"
          placeholder="Search User by Email..."
          onChange={(event) => handleSearch(event)}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="sort-header">
              <span>ID</span>
              <span className="ms-2">
                <i
                  className="fa-solid fa-down-long"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("desc", "id")}
                ></i>
                <i
                  className="fa-solid fa-up-long ms-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("asc", "id")}
                ></i>
              </span>
            </th>
            <th className="sort-email">Email</th>
            <th className="sort-firstName">
              <span>First Name</span>
              <span className="ms-2">
                <i
                  className="fa-solid fa-down-long"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("desc", "first_name")}
                ></i>
                <i
                  className="fa-solid fa-up-long ms-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("asc", "first_name")}
                ></i>
              </span>
            </th>
            <th className="sort-lastName">Last Name</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => (
              // listUsers.map((item, index) => (  <trong trường hợp k có respone k có id>
              <tr key={`item-${index}`}>
                {/* <tr key={`item-${index}`}> */}
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEditUser(item)}
                  >
                    Edit
                  </button>
                </td>
                <th>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteUser(item)}
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
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
    </div>
  );
}

export default TableUser;
