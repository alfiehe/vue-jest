import fetch from './fetch';

export default {
  async getPostList() {
    return fetch.fetchPostList(data => {
      console.log('fetchPostsList be called!');
    })
  }
}