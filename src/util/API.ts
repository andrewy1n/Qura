import axios, { AxiosRequestConfig } from 'axios';

const openFDAconfig: AxiosRequestConfig = {
    baseURL: 'https://api.fda.gov/drug/label.json',
};

export const openFDAClient = axios.create(openFDAconfig);
