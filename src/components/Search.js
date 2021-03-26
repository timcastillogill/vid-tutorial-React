import React, { Component } from 'react';
import axios from 'axios';

export default class Search extends Component {
  state = {
    error: false,
    searchQuery: "",
    tagQuery: "",
    results: [],
    loadingData: false,
  }

  getInfo = () => {
    this.setState({ loadingData: true });
    axios.get('https://lingumi-take-home-test-server.herokuapp.com/videoTutorials')
    .then(({ data }) => {
      data.sort((a, b) => b.averageUserRating - a.averageUserRating);
        this.setState({ results: data });
        this.setState({ loadingData: false });
    })
    .catch(() => this.setState({ error: true }));
  }
}