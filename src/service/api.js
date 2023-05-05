import axios from './axios';


const apiService = {
  // malutmotlarni get qilish uchun url beriladi
  // url / boshlansin yani /users shunga oxshagan
  async getData(url) {
    const data = await axios.get(url);
    return data;
  },

  // malutmotni post qilish uchun url va yaratilgan malumot beriladi
  // url / boshlansin yani /edu shunga oxshagan
  async postData(url, formData) {
    await axios.post(url, formData);
  },
  // malutmotni edit qilish uchun url,id va yaratilgan malumot beriladi
  // url / boshlansin yani /edu shunga oxshagan
  async editData(url, formData, id) {
    await axios.put(`${url}/${id}`, formData);
  },
  // malutmotni delete qilish uchun url va id  beriladi
  // url / boshlansin yani /edu shunga oxshagan
  async deleteData(url, id) {
    await axios.delete(`${url}/${id}`);
  },
};
export default apiService;
