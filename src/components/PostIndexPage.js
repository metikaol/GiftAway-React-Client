import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Collapse, Button, Container, Row, Col, CardDeck } from 'reactstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import Field from './Field';
import { Post } from '../lib/requests';
import CarouselIndexPage from './CarouselIndexPage';
import SearchBox from './SearchBox';



// The React Component parent class is also available
// as a property of the React default import object.
class PostIndexPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      posts: [],
      loading: true,
      collapse: false
    }

    // When using a method as a callback, we must bind
    // this to otherwise we won't have access to any properties
    // of `this` include the state, setState and the props.

    // `.bind()` is a method of functions that effectively
    // creates new function that is copy of the function
    // where `this` is bound permanently.
    this.toggle = this.toggle.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.addPost = this.addPost.bind(this);
    this.updatePosts = this.updatePosts.bind(this);
  }

  componentDidMount () {
    Post
      .all()
      .then(
        posts => {
          this.setState({
            posts: posts,
            loading: false
          });
        }
      );
  }

  deletePost (event) {
    const {currentTarget} = event
    // console.log(currentTarget.dataset.id)

    const {posts} = this.state;
    const postId = parseInt(currentTarget.dataset.id, 10);
    // console.log(postId)
    // To delete a post, will have to update the state
    // to version of the state where that post is no longer
    // present.
    this.setState({
      posts: posts
        .filter(post => post.id !== postId)
    })

    Post
    .delete(postId)
    this.props.history.push(`/posts`)
  }

  addPost (newPost) {
    const {posts} = this.state;

    // 👇 hack because we don't have authors
    newPost.author = {full_name: 'Dr. Zoidberg'}
    this.setState({
      posts: [
        newPost,
        ...posts
      ]
    })
  }

  handleEdit(postId) {
  this.props.history.push(`/posts/${postId}/edit`);
  }

  updatePosts (posts){
    this.setState({
      posts: posts
    })
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }


  render () {
    const { posts, loading } = this.state;
    const { user } = this.props;

    if (loading) {
      return (
        <main
          className="PostIndexPage"
          style={{margin: '0 1rem'}}
        >
          <h2>Posts</h2>
          <h4>Loading...</h4>
        </main>
      )
    }


    return (
        <Container fluid>
          <main>

            <Button className="ml-5" outline color="primary" onClick={this.toggle} style={{ marginBottom: '1rem', fontSize: 15 }}>Search</Button>
            <Collapse isOpen={this.state.collapse}>
              <Card>
                <CardBody>
                  <SearchBox updatePosts={this.updatePosts}/>
                </CardBody>
              </Card>
            </Collapse>


          {/* <h2>Posts</h2> */}
          <CardDeck className="indexCard">
            <Row>
              <ul>
                {
                  posts.map(
                    post => (
                      <Col key={post.id} lg="3" md="4" sm="6" xs="12">
                        <p key={post.id}>
                      <Card className="card">
                        <CarouselIndexPage
                        images ={post.albums}
                      />
                      <CardBody>
                        <CardTitle>
                        <Link style={{fontSize: 20}} to={`/posts/${post.id}`}>
                          {post.title}
                        </Link>
                        </CardTitle>
                        {/* <Field name="Author" value={post.author.full_name} /> */}
                        <Field name="Location" value={post.address} />

                        {post.author.id === user.id ?
                          <div>
                          <Button color="danger"
                            data-id={post.id}
                            onClick={this.deletePost}
                            >Delete</Button>
                            <Button
                              onClick={e => this.handleEdit(post.id)}
                              className="btn btn-secondary ml-3">
                              Edit
                            </Button>
                          </div>
                          : ''}
                        </CardBody>
                      </Card>
                    </p>
                    </Col>
                    )
                  )
                }
              </ul>
            </Row>
          </CardDeck>
      </main>
    </Container>

      )
  }
}

export default PostIndexPage;
