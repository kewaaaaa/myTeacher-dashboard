import { Modal, Form, Input, Button, message } from "antd";
import React, { useState, useEffect } from "react";
import apiService from "../service/api";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_MODAL,
  CLOSE_MODAL,
  EDIT_MODAL,
  START_LOAD,
} from "../redux/ationTypes";
import { useRef } from "react";

const ModalFC = (edit) => {
  const dispatch = useDispatch();
  const isModalOpenRed = useSelector((state) => state.isModalOpen);
  const modalType = useSelector((state) => state.modalType);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // form for Admin
  const [form] = Form.useForm();
  const formRef1 = useRef();

  // form for Client
  const [form2] = Form.useForm();
  const formRef2 = useRef();

  //Deafout Values
  useEffect(() => {
    if (modalType == "Edit") {
      if (formRef1.current) {
        form?.setFieldValue("first_name", edit.edit.edit.first_name);
        form?.setFieldValue("last_name", edit.edit.edit.last_name);
        form?.setFieldValue("role", edit.edit.edit.role);
      }
      if (formRef2.current) {
        form2?.setFieldValue("first_name", edit.edit.edit.first_name);
        form2?.setFieldValue("last_name", edit.edit.edit.last_name);
        form2?.setFieldValue("location", edit.edit.edit.location);
        form2?.setFieldValue("age", edit.edit.edit.age);
        form2?.setFieldValue("course", edit.edit.edit.course);
      }
    }
  }, [edit]);

  //Modal close
  const handleCancel = () => {
    if (formRef1.current && formRef2.current) {
      form.resetFields();
      form2.resetFields();
    } else formRef1.current ? form.resetFields() : form2.resetFields();
    dispatch({ type: CLOSE_MODAL });
    dispatch({ type: EDIT_MODAL });
  };

  //Modal Form Submit
  const handleOk = (e) => {
    setConfirmLoading(true);
    if (modalType == "Add") {
      handleAdd(e);
    }
    if (modalType == "Edit") {
      handleEdit(e);
    }
  };

  ///post data
  const handleAdd = async (e) => {
    setConfirmLoading(true);
    try {
      const resp = await apiService.postData(edit.edit.props.url, e);
      if (formRef1.current && formRef2.current) {
        form.resetFields();
        form2.resetFields();
      } else formRef1.current ? form.resetFields() : form2.resetFields();
      setConfirmLoading(false);
      message.success(resp?.message);
      setTimeout(() => {
        dispatch({ type: CLOSE_MODAL });
      }, 100);
      dispatch({ type: START_LOAD });
    } catch (error) {
      setConfirmLoading(false);
      // message.error('error');
    }
  };

  //edit data
  const handleEdit = async (e) => {
    setConfirmLoading(true);
    try {
      const resp = await apiService.editData(
        edit.edit.props.url,
        e,
        edit?.edit?.edit?.id
      );
      dispatch({ type: ADD_MODAL });
      if (formRef1.current && formRef2.current) {
        form.resetFields();
        form2.resetFields();
      } else formRef1.current ? form.resetFields() : form2.resetFields();
      setConfirmLoading(false);
      dispatch({ type: CLOSE_MODAL });
      // dispatch({ type: START_LOAD });
      setTimeout(() => {
        dispatch({ type: START_LOAD });
      }, 100);
      message.success(resp?.message);
    } catch (error) {
      // message.error('error');
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      // width={1100}
      title={`${modalType} Modal`}
      open={isModalOpenRed}
      footer={null}
      onCancel={handleCancel}
      onOk={handleOk}
      confirmLoading={confirmLoading}
    >
      {edit.edit.props.page == "Admin" ? (
        <>
          <Form form={form} onFinish={handleOk} ref={formRef1}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input the First Name!",
                },
              ]}
              label="First Name"
              name="first_name"
            >
              <Input placeholder="Write the First Name" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input the Last Name!",
                },
              ]}
              label="Last Name"
              name="last_name"
            >
              <Input placeholder="Write the Last Name" />
            </Form.Item>
            <Form.Item
              label="Role"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Please input the Role!",
                },
              ]}
            >
              <Input placeholder="Write the Role" />
            </Form.Item>
            <div
              style={{
                display: "flex",
                gap: 10,
                width: 200,
                marginLeft: "auto",
              }}
            >
              <Button
                onClick={handleOk}
                htmlType="submit"
                type="primary"
                style={{ width: "50%" }}
                size="large"
                loading={confirmLoading}
              >
                {modalType}
              </Button>
              <Button
                onClick={handleCancel}
                size="large"
                style={{ width: "50%" }}
              >
                Cencel
              </Button>
            </div>
          </Form>
        </>
      ) : (
        <>
          <Form form={form2} onFinish={handleOk} ref={formRef2}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input the First Name!",
                },
              ]}
              label="First Name"
              name="first_name"
            >
              <Input placeholder="Write the First Name" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input the Last Name!",
                },
              ]}
              label="Last Name"
              name="last_name"
            >
              <Input placeholder="Write the Last Name" />
            </Form.Item>
            <Form.Item
              label="Location"
              name="location"
              rules={[
                {
                  required: true,
                  message: "Please input the Location!",
                },
              ]}
            >
              <Input placeholder="Write the Location" />
            </Form.Item>
            <Form.Item
              label="Age"
              name="age"
              rules={[
                {
                  required: true,
                  message: "Please input the Age!",
                },
              ]}
            >
              <Input placeholder="Write the Age" />
            </Form.Item>
            <Form.Item
              label="Course"
              name="course"
              rules={[
                {
                  required: true,
                  message: "Please input the Course!",
                },
              ]}
            >
              <Input placeholder="Write the Course" />
            </Form.Item>
            <div
              style={{
                display: "flex",
                gap: 10,
                width: 200,
                marginLeft: "auto",
              }}
            >
              <Button
                onClick={handleOk}
                htmlType="submit"
                type="primary"
                style={{ width: "50%" }}
                size="large"
                loading={confirmLoading}
              >
                {modalType}
              </Button>
              <Button
                onClick={handleCancel}
                size="large"
                style={{ width: "50%" }}
              >
                Cencel
              </Button>
            </div>
          </Form>
        </>
      )}
    </Modal>
  );
};

export default ModalFC;
