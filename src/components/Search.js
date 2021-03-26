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

  handleSearchInputChange = () => {
    this.setState({ 
      searchQuery: this.search.value
    }, () => {
      if (this.state.serachQuery && this.state.searchQuery.length > 1) {
        if (this.state.searchQuery.length % 2 === 0) {
          this.getInfo()
        }
      } else if (this.state.serachQuery === "") {
        this.setState({ results: [] });
      }
    })
  }
}