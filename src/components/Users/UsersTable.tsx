import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import NoEncryptionGmailerrorredIcon from "@mui/icons-material/NoEncryptionGmailerrorred";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Button from "@mui/material/Button";
import { api } from "../../utils/api";
import Swal from "sweetalert2";
function UsersTable() {
  type usersType = {
    id: number;
    key: String;
    firstName: String;
    lastName: String;
    email: String;
    password: String;
    status: boolean;
  }[];
  type rows = {
    id: number;
    key: String;
  }[];
  const navigate = useNavigate();
  const [rows, setRows] = useState<usersType>([]);
  const [selectedRows, setSelectedRows] = useState<rows>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let selectedRowsId = selectedRows.map((row) => row.key);
  const onDeleteSelectedRows = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`users/${selectedRowsId}`).then((res) => {
          // console.log(res);
          if (!res.data.isValidUser) {
            navigate("/login");
          } else {
            navigate("/");
          }
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const onBlockSelectedRows = () => {
    Swal.fire({
      title: "Are you sure?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Block it!",
    }).then((result) => {
      if (result.isConfirmed) {
        api.put(`block`, selectedRowsId).then((res) => {
          // console.log(res);
          if (!res.data.isValidUser) {
            navigate("/login");
          } else {
            navigate("/");
          }
        });
        Swal.fire("Blocked!", "success");
      }
    });
  };
  const onUnlockSelectedRows = () => {
    Swal.fire({
      title: "Are you sure?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Unlock it!",
    }).then((result) => {
      if (result.isConfirmed) {
        api.put(`unlock`, selectedRowsId).then((res) => {
          // console.log(res);
          // if (!res.data.isValidUser) {
          //   navigate("/login");
          // } else {
          //   navigate("/");
          // }
        });
        Swal.fire("Unlocked!", "success");
      }
    });
  };
  const onDelete = (params: any) => {
    console.log("params", params);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`users`, { data: selectedRowsId }).then((res) => {
          console.log(res);
          if (res.data.isValidUser) {
            navigate("/login");
          } else {
            navigate("/");
          }
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const onBlock = (params: any) => {
    console.log("params", params);
    Swal.fire({
      title: "Are you sure?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Block it!",
    }).then((result) => {
      if (result.isConfirmed) {
        api.put(`block`, [params.row.key]).then((res) => {
          console.log(res);
          if (!res.data.isValidUser) {
            navigate("/login");
          } else {
            navigate("/");
          }
        });
        Swal.fire("Blocked!", "success");
      }
    });
  };
  const unLock = (params: any) => {
    console.log("params", params);
    Swal.fire({
      title: "Are you sure?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, unlock it!",
    }).then((result) => {
      if (result.isConfirmed) {
        api.put(`unlock`, [params.row.key]).then((res) => {
          console.log(res);
          // if (!res.data.isValidUser) {
          //   navigate("/login");
          // } else {
          //   navigate("/");
          // }
        });
        Swal.fire("Unlocked!", "success");
      }
    });
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "email",
      headerName: "Email",
      type: "string",
      width: 300,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params: GridRenderCellParams<any>) => (
        <strong>
          <div
            // onClick={(e) => {
            //   e.preventDefault();
            //   e.stopPropagation();
            // }}
            className="flex flex-row, items-center gap-x-4 cursor-pointer  z-10 "
          >
            <div onClick={() => onBlock(params)}>
              <NoEncryptionGmailerrorredIcon color="warning" />
            </div>
            <div onClick={() => unLock(params)}>
              <LockOpenIcon color="success" />
            </div>
            <div onClick={() => onDelete(params)}>
              <DeleteIcon color="error" />
            </div>
          </div>
        </strong>
      ),
    },
  ];
  const onRowsSelectionHandler = (ids: any) => {
    const selectedRowsData = ids.map((id: any) =>
      rows.find((row) => row.id === id)
    );
    console.log(selectedRowsData);
    setSelectedRows(selectedRowsData);
  };
  const onCellClickHandler = (ids: any) => {
    // onDelete(ids);
    console.log(ids, "onselected");
  };

  useEffect(() => {
    api
      .get("users")
      .then((res) => {
        console.log("users: ", res);
        setRows(
          res.data.map((item: any, index: number) => {
            return {
              id: index,
              key: item._id,
              firstName: item.firstName,
              lastName: item.lastName,
              email: item.email,
              status: item.status,
            };
          })
        );
      })
      .catch((err) => {
        console.log("error: ", err);
      })
      .finally(() => {
        setIsLoading(true);
      });
  }, []);
  console.log("rows", rows);

  return (
    <>
      {selectedRows.length > 0 && (
        <div
          // onClick={(e) => {
          //   e.preventDefault();
          //   e.stopPropagation();
          // }}
          className="flex flex-row, items-center gap-x-4 cursor-pointer  z-10 mt-5 pl-3 mb-2"
        >
          <div onClick={onBlockSelectedRows}>
            <NoEncryptionGmailerrorredIcon color="warning" />
          </div>
          <div onClick={onUnlockSelectedRows}>
            <LockOpenIcon color="success" />
          </div>
          <div onClick={onDeleteSelectedRows}>
            <DeleteIcon color="error" />
          </div>
        </div>
      )}

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
          onRowClick={(ids) => onCellClickHandler(ids)}
        />
      </div>
    </>
  );
}

export default UsersTable;
