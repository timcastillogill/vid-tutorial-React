import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import './Search.css'
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
      if (this.state.searchQuery && this.state.searchQuery.length > 1) {
        if (this.state.searchQuery.length % 2 === 0) {
          this.getInfo()
        }
      } else if (this.state.serachQuery === "") {
        this.setState({ results: [] });
      }
    })
  }

  handleTagInputChange = () => {
    this.setState({ 
      tagQuery: this.tag.value
    }, () => {
      if (this.state.tagQuery && this.state.tagQuery.length > 1) {
        if (this.state.tagQuery.length % 2 === 0) {
          return this.getInfo();
        }
      } else if (this.state.tagQuery === "") {
        this.setState({ results: [] })
      }
    })
  }

  render() {
    const searchForTutorials = this.state.results.filter((data) => {
      if (this.state.searchQuery == null) {
        return data;
      } else if (data.videoTitle.toLowerCase().includes(this.state.searchQuery.toLowerCase()) || data.teacherName.toLowerCase().includes(this.state.searchQuery.toLowerCase())) {
        return data;
      }
    }).map(data => {
      return (
        <Container maxWidth="sm">
          <Card className="root">
            <CardContent>
              <Typography className="title">{data.videoTitle}</Typography>
              <Typography className="url">{data.videoUrl}</Typography>
              <Typography className="name">{data.teacherName}</Typography>
            </CardContent>
          </Card>
        </Container>
      )
    })

    const searchForTags = this.state.results.filter((data) => {
      if (this.state.tagQuery == null) {
        return data;
      } else if (data.tags.map(word => word.toLowerCase()).includes(this.state.tagQuery.toLowerCase())) {
        return data;
      }
    }).map(data => {
      return (
        <Container maxWidth="sm">
          <Card className="root">
            <CardContent>
              <Typography className="title">{data.videoTitle}</Typography>
              <Typography className="url">{data.videoUrl}</Typography>
              <Typography className="name">{data.teacherName}</Typography>
            </CardContent>
          </Card>
        </Container>
      )
    })
    return (
      <div className="search">
        <form>
          <TextField
            variant="filled"
            className="inputSearch"
            color="secondary"
            type="text"
            placeholder="Search for Tutorials..."
            inputRef={input => this.search = input}
            onChange={this.handleSearchInputChange}
            style={{
              backgroundColor: '#5FBCDD',
              margin: '10px',
              width: '30%',
              display: 'flex',
              margin: 'auto',
            }}
            />
            <TextField
              variant="filled"
              className="inputTags"
              color="primary"
              fullWidth="true"
              type="text"
              placeholder="Search using Tags..."
              inputRef={input => this.tag = input}
              onChange={this.handleTagInputChange}
              style={{
                backgroundColor: '#F4BE37',
                margin: '10px',
                width: '30%',
                display: 'flex',
                margin: '10px auto',
              }}
              />
          <Container maxWidth="sm">
            {this.state.loadingData &&
            <Button
            className="button"
            fullWidth="true"
            variant="contained"
            color="secondary"
            type="button" >
            Loading...</Button>}
            {!this.state.loadingData &&
            <Button
              className="button"
              fullWidth="true"
              container=""
              variant="contained"
              color="secondary"
              type="button" 
              onClick={() => this.getInfo() }>
            <span>Refresh Data</span>
            </Button>}
          </Container>
        </form>
        {searchForTags}
        {searchForTutorials}
      </div>
    )
  }

}