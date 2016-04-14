import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';

request.get('/api/ping').end((err, res) => {
  if (!err && res.statusCode == 200) {
    const element = document.getElementById('version');
    element.innerHTML = res.body.version; // Yes, not very react'y of us..
  }
});

ReactDOM.render(<div><h1>Hello Client</h1><p id="version"></p></div>, document.getElementById('content'));
