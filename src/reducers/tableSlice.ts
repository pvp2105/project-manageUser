import { createSlice } from "@reduxjs/toolkit";

interface TableState {
    listUsers: any[]
    totalUsers: number
    totalPages: number
    isShowModalAdd: boolean
    isShowModalEdit: boolean
    isShowModalDelete: boolean

    dataUserEdit: any
    dataUserDelete: any

    sortBy: string
    sortField: string

    dataExport: string
}

const initialState: TableState = {
    listUsers: [],
    totalUsers: 0,
    totalPages: 0,
    isShowModalAdd: false,
    isShowModalEdit: false,
    isShowModalDelete: false,

    dataUserEdit: {},
    dataUserDelete: {},

    sortBy: "asc",
    sortField: "id",

    dataExport: "id"

};

const TableSlice = createSlice({
    name: "Users",
    initialState,
    reducers: {
        getListUsers: (state, action) => {
            state.listUsers = action.payload;
        },
        getTotalUsers: (state, action) => {
            state.totalUsers = action.payload;
        },
        getTotalPages: (state, action) => {
            state.totalPages = action.payload;
        },
        getIsShowModalAdd: (state, action) => {
            state.isShowModalAdd = action.payload;
        },
        getIsShowModalEdit: (state, action) => {
            state.isShowModalEdit = action.payload;
        },
        getIsShowModalDelete: (state, action) => {
            state.isShowModalDelete = action.payload;
        },
        getDataUserEdit: (state, action) => {
            state.dataUserEdit = action.payload;
        },
        getDataUserDelete: (state, action) => {
            state.dataUserDelete = action.payload;
        },
        getSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        getSortField: (state, action) => {
            state.sortField = action.payload;
        },
        getDataExport: (state, action) => {
            state.dataExport = action.payload;
        },

    },
});

export const {
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
    getDataExport
} = TableSlice.actions;

export default TableSlice.reducer;
