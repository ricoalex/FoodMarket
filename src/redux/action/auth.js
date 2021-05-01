import Axios from 'axios';
import {API_HOST} from '../../config';
import {showMessage, storeData} from '../../utils';
import {setLoading} from './global';

export const signUpAction = (
  dataRegister,
  photoReducer,
  navigation,
) => dispatch => {
  Axios.post(`${API_HOST.url}/register`, dataRegister)
    .then(res => {
      const token = `${res.data.data.token_type} ${res.data.data.access_token}`;
      const profile = res.data.data.user;

      // data token
      storeData('token', {
        value: token,
      });
      if (photoReducer.isUploadPhoto) {
        const photoForUpload = new FormData();
        photoForUpload.append('file', photoReducer);
        Axios.post(`${API_HOST.url}/user/photo`, photoForUpload, {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/formdata',
          },
        })
          .then(resUpload => {
            profile.profile_photo_url = `${API_HOST.urlStorage}/${resUpload.data.data[0]}`;

            // data user
            storeData('userProfile', profile);
            navigation.reset({index: 0, routes: [{name: 'SuccessSignUp'}]});
          })
          .catch(err => {
            showMessage('Upload photo tidak berhasil');
            navigation.reset({index: 0, routes: [{name: 'SuccessSignUp'}]});
          });
      } else {
        // data user
        storeData('userProfile', profile);
        navigation.reset({index: 0, routes: [{name: 'SuccessSignUp'}]});
      }

      dispatch(setLoading(false));
    })
    .catch(err => {
      dispatch(setLoading(false));
      console.log('sign up error: ', err);
      showMessage(err?.response?.data?.message, 'danger');
    });
};

export const signInAction = (form, navigation) => dispatch => {
  dispatch(setLoading(true));
  Axios.post(`${API_HOST.url}/login`, form)
    .then(res => {
      console.log('Success login ', res);
      const token = `${res.data.data.token_type} ${res.data.data.access_token}`;
      const profile = res.data.data.user;

      profile.profile_photo_url = `${API_HOST.urlStorage}/${profile.profile_photo_path}`;

      dispatch(setLoading(false));
      storeData('token', {
        value: token,
      });
      storeData('userProfile', profile);
      navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
    })
    .catch(err => {
      dispatch(setLoading(false));
      console.log('error login ', err.response);
      showMessage(err?.response?.data?.data?.message, 'danger');
    });
};
