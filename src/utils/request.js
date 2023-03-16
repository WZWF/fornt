import request from "axios"
import config from "@/config"
import { getToken, removeId, removeToken, getId } from "./auth"
import { Notification } from 'element-ui'
import store from '@/store/index'

const service = request.create({
    baseURL: config.API_URL,
    timeout: 5000,
    headers: {
        Authentication: getToken(),
    },
    withCredentials: true,
    changeOrigin: true,
});

service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code === 200) {
            if (res.msg !== null) {
                Notification.success({
                    title: 'Success ',
                    message: res.message,
                    type: 'success'
                });
            }

        } else if (res.code === 500250) {
            //store.dispatch("user/logout");
            if(getToken() !== null) removeToken() // must remove  token  first
            if(getId() !== null) removeId()
            if (localStorage.getItem("ID") !== null) localStorage.removeItem("ID")
            if (localStorage.getItem("token") !== null) localStorage.removeItem("token")
        } else {
            Notification.error({
                title: '错误提示: ',
                message: res.message
            });
        }
        return res
    },

    error => {
        console.log('err' + error);
        return Promise.reject(error)
    }
);

export default service
