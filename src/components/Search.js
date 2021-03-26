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
}