import React, { useState, useEffect, useCallback } from "react";
import { Button, Space, Spin, Table, Modal, message } from "antd";
import { ExclamationCircleFilled, SyncOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import ModalFC from "./ModalFC";
import apiService from "../service/api";
import {
  ADD_MODAL,
  EDIT_MODAL,
  OPEN_MODAL,
  STOP_LOAD,
} from "../redux/ationTypes";
import s from "./style.module.scss";
const { Column } = Table;
const { confirm } = Modal;

const Overview = (props) => {
  const [users, setUsers] = useState({});
  const [laoding, setLaoding] = useState(true);
  const [deleteBtn, setDeleteBtn] = useState(true);
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.reloadItems);
  const [checked, setChecked] = useState([]);
  //data edit arr
  const [edit, setEdit] = useState([]);

  // selctios
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      selectedRows.length > 1 ? setDeleteBtn(false) : setDeleteBtn(true);
      setChecked([...selectedRows]);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  //Modal open
  const OpenAdd = () => {
    dispatch({ type: OPEN_MODAL });
    dispatch({ type: ADD_MODAL });
  };

  const openEdit = (e) => {
    const id = e;
    dispatch({ type: OPEN_MODAL });
    dispatch({ type: EDIT_MODAL });

    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        setEdit(users[i]);
      }
    }
  };

  ///get data
  const getData = useCallback(async () => {
    setLaoding(true);
    setDeleteBtn(true);
    dispatch({ type: STOP_LOAD });
    apiService
      .getData(props.props.url)
      .then((res) => {
        setUsers(
          res.data?.map((item) => {
            return (item = { ...item, key: item.id });
          })
        );
        setLaoding(false);
        // message.success(res?.message);
      })
      .catch((err) => {
        setLaoding(false);
        message.error(err?.message);
      });
  }, [dispatch, props.props.url]);

  if (reload) getData();

  useEffect(() => {
    getData();
  }, [getData]);

  // Delete confirm
  const handleDel = async (e) => {
    setLaoding(true);
    try {
      const resp = await apiService.deleteData(props.props.url, e);
      message.success(resp?.message);
      getData();
    } catch (error) {
      message.error(error?.message);
      setLaoding(false);
    }
  };

  const deletSelected = () => {
    confirm({
      title: "Are you sure to delete selected Items?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        checked?.map((e) => {
          handleDel(e.id);
          return 0;
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const showDeleteConfirm = (e) => {
    confirm({
      title: "Are you sure to delete this Item?",
      icon: <ExclamationCircleFilled />,
      content: `Item id: ${e}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDel(e);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <div className={s.table}>
      <Space className={s.table__header}>
        <span className={s.title__span}></span>
        <h1 className={s.table__title}>{props.props.page} Panel</h1>
        <div className={s.table__refresh}>
          <Button onClick={deletSelected} danger disabled={deleteBtn}>
            Delete All Selected
          </Button>
          <Button onClick={getData} disabled={laoding}>
            <Space>
              {laoding && <SyncOutlined spin />}
              Refresh
            </Space>
          </Button>
        </div>
      </Space>
      {laoding ? (
        <div className="loading">
          <Space
            direction="vertical"
            style={{
              width: "100%",
            }}
          >
            <Spin tip="Loading" size="large">
              <div className="content" />
            </Spin>
          </Space>
        </div>
      ) : (
        <>
          <div className={s.table__box}>
            <Table
              dataSource={users}
              size="small"
              rowSelection={{
                ...rowSelection,
              }}
            >
              <Column
                title="First Name"
                dataIndex="first_name"
                key="first_name"
              />
              <Column title="Last Name" dataIndex="last_name" key="last_name" />
              {props.props.page === "Admin" ? (
                <>
                  <Column title="Role" dataIndex="role" key="role" />
                  <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                      <Space size="middle">
                        <Button
                          onClick={() => {
                            openEdit(record.id);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          danger
                          onClick={() => {
                            showDeleteConfirm(record.id);
                          }}
                          id={record.id}
                        >
                          Delate
                        </Button>
                      </Space>
                    )}
                  />
                </>
              ) : (
                <>
                  <Column
                    title="Location"
                    dataIndex="location"
                    key="location"
                  />
                  <Column title="Age" dataIndex="age" key="age" />
                  <Column title="Course" dataIndex="course" key="course" />
                  <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                      <Space size="middle">
                        <Button
                          onClick={() => {
                            openEdit(record.id);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          danger
                          onClick={() => {
                            showDeleteConfirm(record.id);
                          }}
                          id={record.id}
                        >
                          Delate
                        </Button>
                      </Space>
                    )}
                  />
                </>
              )}
            </Table>
          </div>
          <Button type="primary" onClick={OpenAdd} size="large">
            Add Item
          </Button>
          <ModalFC edit={{ ...props, edit: edit }} />
        </>
      )}
    </div>
  );
};

export default Overview;
