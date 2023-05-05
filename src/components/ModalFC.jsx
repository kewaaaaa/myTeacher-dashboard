import { Modal, Form, Input, Button, message, Select, InputNumber } from "antd";
import React, { useState, useEffect } from "react";
import apiService from "../service/api";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MODAL, START_LOAD } from "../redux/ationTypes";
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
    if (modalType === "Edit") {
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
    } else if (modalType === "Add") {
      if (formRef1.current && formRef2.current) {
        form.resetFields();
        form2.resetFields();
      } else formRef1.current ? form.resetFields() : form2.resetFields();
    }
  }, [edit, form, form2, modalType]);

  //Modal close
  const handleCancel = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  //Modal Form Submit
  const handleOk = (e) => {
    setConfirmLoading(true);
    if (modalType === "Add") {
      handleAdd(e);
    }
    if (modalType === "Edit") {
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
      setConfirmLoading(false);
      dispatch({ type: CLOSE_MODAL });
      setTimeout(() => {
        dispatch({ type: START_LOAD });
      }, 100);
      message.success(resp?.message);
    } catch (error) {
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      title={`${modalType} Modal`}
      open={isModalOpenRed}
      footer={null}
      onCancel={handleCancel}
      onOk={handleOk}
      confirmLoading={confirmLoading}
    >
      {edit.edit.props.page === "Admin" ? (
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
              <Input placeholder="Input First Name" />
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
              <Input placeholder="Input Last Name" />
            </Form.Item>
            <Form.Item
              label="Role"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Please select the Role!",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select a Role"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "admin",
                    label: "admin",
                  },
                  {
                    value: "operator",
                    label: "operator",
                  },
                  {
                    value: "manager",
                    label: "manager",
                  },
                  {
                    value: "tutor",
                    label: "tutor",
                  },
                ]}
              />
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
              <Input placeholder="Input First Name" />
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
              <Input placeholder="Input Last Name" />
            </Form.Item>
            <Form.Item
              label="Location"
              name="location"
              rules={[
                {
                  required: true,
                  message: "Please select the Location!",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select a Location"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "Tashkent Sh.",
                    label: "Tashkent Sh.",
                  },
                  {
                    value: "Tashkent",
                    label: "Tashkent",
                  },
                  {
                    value: "Samarqand",
                    label: "Samarqand",
                  },
                  {
                    value: "Andijan",
                    label: "Andijan",
                  },
                  {
                    value: "Khorezm",
                    label: "Khorezm",
                  },
                  {
                    value: "Qaraqalpakistan",
                    label: "Qaraqalpakistan",
                  },
                  {
                    value: "Fergana",
                    label: "Fergana",
                  },
                  {
                    value: "Bukhara",
                    label: "Bukhara",
                  },
                  {
                    value: "Jizzakh",
                    label: "Jizzakh",
                  },
                  {
                    value: "Namangan",
                    label: "Namangan",
                  },
                  {
                    value: "Navoiy",
                    label: "Navoiy",
                  },
                  {
                    value: "Qashqadaryo",
                    label: "Qashqadaryo",
                  },
                  {
                    value: "Sirdaryo",
                    label: "Sirdaryo",
                  },
                  {
                    value: "Surxondaryo",
                    label: "Surxondaryo",
                  },
                ]}
              />
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
              <InputNumber min={5} max={120} placeholder="Input Age" />
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
              <Select
                showSearch
                placeholder="Select a Course"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "English",
                    label: "English",
                  },
                  {
                    value: "Russian",
                    label: "Russian",
                  },
                  {
                    value: "Uzbek",
                    label: "Uzbek",
                  },
                ]}
              />
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
