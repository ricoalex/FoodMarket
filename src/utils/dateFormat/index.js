import Moment from 'moment';

const date = (format, value) => {
  Moment.locale('id');
  return Moment.unix(value).format(format);
};

export default date;
