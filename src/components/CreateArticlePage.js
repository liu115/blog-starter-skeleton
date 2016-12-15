import 'isomorphic-fetch';
import React, { Component } from 'react';

class CreateArticlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tags: '',
    };
  }
  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleContentChange = (e) => {
    this.setState({ content: e.target.value });
  };
  handleSubmitClick = () => {
    const confirm = window.confirm('確定要新增文章嗎？');
    if (confirm) {
      fetch(`/api/articles/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: this.state.title,
          content: this.state.content,
          tags: this.state.tags
        })
      });
      window.location = `#/articles`;
    }
  }
  renderTitle = () => {
    return (
    <div className="form-group">
      <label htmlFor="inputTitle" className="col-sm-2 control-label">Title</label>
      <div className="col-sm-8">
        <input
          type="text"
          className="form-control"
          id="inputTitle"
          onChange={this.handleTitleChange.bind(this)}
          value={this.state.title}
        />
      </div>
    </div>
    );
  }
  renderTags = () => {
    return (
    <div className="form-group">
      <label htmlFor="inputTag" className="col-sm-2 control-label">Tags</label>
      <div className="col-sm-8">
        <input type="text" className="form-control" id="inputTag" value={this.state.tags} />
      </div>
    </div>
    );
  };

  renderContent = () => {
    return (
    <div className="form-group">
      <label htmlFor="inputContent" className="col-sm-2 control-label">Title</label>
      <div className="col-sm-8">
        <textarea
          type="text"
          className="form-control"
          id="inputT"
          onChange={this.handleContentChange.bind(this)}
          value={this.state.content}
          rows="5"
        />
      </div>
    </div>
    );
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <button
              className="btn btn-info pull-right"
              role="button"
              onClick={this.handleSubmitClick}
            >送出</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {this.renderTitle()}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {this.renderTags()}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {this.renderContent()}
          </div>
        </div>
      </div>
    );
  }
}

export default CreateArticlePage;
