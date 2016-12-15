import 'isomorphic-fetch';
import React, { Component, PropTypes } from 'react';

class SingleArticlePage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tags: [],
      isEditing: false,
    };
  }

  componentDidMount() {
    // fetch with id
    fetch(`/api/articles/${this.props.id}`)
    .then(res => res.json())
    .then(json => {
      this.setState({
        title: json.title,
        content: json.content,
        tags: json.tags
      });
    });
  }

  componentDidUpdate() {
    // fetch with id
    if (!this.state.isEditing) {
      fetch(`/api/articles/${this.props.id}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          title: json.title,
          content: json.content,
          tags: json.tags
        });
      });
    }
  }

  handleTagsChange = () => {
  };

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleContentChange = (e) => {
    this.setState({ content: e.target.value });
  };
  handleDelClick = () => {
    const confirm = window.confirm('確定要刪除文章嗎？');
    if (confirm) {
      window.location = `/#/articles`;
      fetch(`/api/articles/${this.props.id}`, { method: 'DELETE' });

    }

  };

  handleEditClick = () => {
    if (this.state.isEditing) {
      fetch(`/api/articles/${this.props.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: this.state.title,
          content: this.state.content,
          tags: this.state.tags
        })
      });

    }
    const a = !this.state.isEditing;
    this.setState({ isEditing: a });
  };

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
          readOnly={!this.state.isEditing}
        />
      </div>
    </div>
    );
  };

  renderTags = () => {
    return (
    <div className="form-group">
      <label htmlFor="inputTag" className="col-sm-2 control-label">Tags</label>
      <div className="col-sm-8">
        <input type="text" className="form-control" id="inputTag" value={this.state.tags.join()} readOnly={!this.state.isEditing} />
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
          readOnly={!this.state.isEditing}
          rows="5"
        />
      </div>
    </div>
    );
  };

  render() {
    const { isEditing } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="page-header">
              {this.renderTitle()}
            </div>
          </div>

        </div>
        <div className="row">
          <div className="col-md-12">
            {this.renderTags()}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {this.renderContent()}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <button
              className="btn btn-info"
              role="button"
              onClick={this.handleEditClick}
            >{isEditing ? '確認' : '編輯'}</button>
            {isEditing ? null :
            <button
              className="btn btn-warning"
              role="button"
              onClick={this.handleDelClick}
            >刪除</button>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default SingleArticlePage;
