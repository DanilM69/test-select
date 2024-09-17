import { AxiosResponse } from 'axios';
import axiosConfig from './axiosConfig.ts';
import IPaginationResponse from '../models/response/IPaginationResponse';
import IUserResponse from '../models/response/IUserResponse';

class UsersAPI {
    public static getUsers(page: number, limit: number): Promise<AxiosResponse<IPaginationResponse<IUserResponse>>> {
        return axiosConfig.get('/users', {
            params: {
                page,
                limit,
            }
        });
    }
}

export default UsersAPI;
