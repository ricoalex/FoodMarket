import Axios from 'axios';
import {API_HOST} from '../../config';
import {getData} from '../../utils';
import {setLoading} from './global';

export const getOrders = () => dispatch => {
  dispatch(setLoading(true));
  getData('token').then(resToken => {
    Axios.get(`${API_HOST.url}/transaction`, {
      headers: {
        Authorization: resToken.value,
      },
    })
      .then(res => {
        console.log('get orders: ', res.data);
        dispatch(setLoading(false));
        dispatch({type: 'SET_ORDER', value: res.data.data.data});
      })
      .catch(err => {
        console.log('err: ', err.response);
        dispatch(setLoading(false));
      });
  });
};

export const getInProgress = () => dispatch => {
  dispatch(setLoading(true));
  getData('token').then(resToken => {
    Axios.all([
      Axios.get(`${API_HOST.url}/transaction?status=PENDING`, {
        headers: {
          Authorization: resToken.value,
        },
      }),
      Axios.get(`${API_HOST.url}/transaction?status=SUCCESS`, {
        headers: {
          Authorization: resToken.value,
        },
      }),
      Axios.get(`${API_HOST.url}/transaction?status=ON_DELIVERY`, {
        headers: {
          Authorization: resToken.value,
        },
      }),
    ])
      .then(
        Axios.spread((res1, res2, res3) => {
          console.log('get in Progress1 : ', res1);
          console.log('get in Progress2 : ', res2);
          console.log('get in Progress3 : ', res3);
          const pending = res1.data.data.data;
          const success = res2.data.data.data;
          const onDelivery = res3.data.data.data;
          dispatch(setLoading(false));
          dispatch({
            type: 'SET_IN_PROGRESS',
            value: [...pending, ...success, ...onDelivery],
          });
        }),
      )
      .catch(err => {
        console.log('err get in Progress: ', err.response);
        dispatch(setLoading(false));
      });
  });
};

export const getPostOrders = () => dispatch => {
  getData('token').then(resToken => {
    Axios.all([
      Axios.get(`${API_HOST.url}/transaction?status=CANCELLED`, {
        headers: {
          Authorization: resToken.value,
        },
      }),
      Axios.get(`${API_HOST.url}/transaction?status=DELIVERED`, {
        headers: {
          Authorization: resToken.value,
        },
      }),
    ])

      .then(
        Axios.spread((res1, res2) => {
          console.log('get Cancel Order 1: ', res1);
          console.log('get Cancel Order 2: ', res2);
          const cancelled = res1.data.data.data;
          const delivered = res2.data.data.data;
          dispatch(setLoading(false));
          dispatch({
            type: 'SET_POST_ORDERS',
            value: [...cancelled, ...delivered],
          });
        }),
      )
      .catch(err => {
        console.log('err get post orders: ', err.response);
        dispatch(setLoading(false));
      });
  });
};
