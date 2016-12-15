import 'isomorphic-fetch';
import React, {Component} from 'react';

class ArticlesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    // fetch here
    fetch('/api/articles/')
    .then(res => res.json())
    .then(json => {
      this.setState({ articles: json });
      console.log(json);
    });
  }
  onClickHandler(id) {
    console.log(id);
    window.location = `#/articles/${id}`;
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Tag</th>
                  <th>Content</th>
                </tr>
              </thead>
              <tbody>
              {
                this.state.articles.map((a , i) => {
                  return (
                    <tr onClick={() => this.onClickHandler(a._id)} key={i}>
                      <td>{a.title}</td>
                      <td>{a.tags.join()}</td>
                      <td>{a.content}</td>
                    </tr>
                  );
                })
              }
              </tbody>

            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticlesPage;
