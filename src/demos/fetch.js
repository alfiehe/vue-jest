import axios from 'axios';

export default {
  async fetchPostList(callback) {
    return axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {
      return callback(res.data);
    });
  }
}