import {Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Collapse, Row} from "reactstrap";
import {TextFormat, Translate} from "react-jhipster";
import {APP_LOCAL_DATE_FORMAT} from "app/config/constants";
import {Link, RouteComponentProps} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState} from "react";

const PostItem = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const filter_comments_by_post = props.commentListFilteredWithUserId.filter((comment)=>{
    return comment.post.id === props.post.id
  })
  console.log(props.account_login)
  console.log(filter_comments_by_post)

  return (
        <div>
          <Card>
            <CardBody>
              <CardTitle tag="h5">
                <Row>
                  <Col >
                    <Translate contentKey={`ihelpApp.Tag.${props.post.tags}`} /> { }
                    <Translate contentKey={`ihelpApp.Type.${props.post.types}`} />
                  </Col>
                  <Col>
                    {props.post.verified ?  <h4 style={{color:"green"}}>Verified</h4> :  <h4 style={{color:"red"}}>Not Verified</h4> }
                  </Col>
                </Row>
              </CardTitle>

              <CardSubtitle className="mb-2 text-muted " tag="h6">
                {props.post.date ? <TextFormat type="date" value={props.post.date} format={APP_LOCAL_DATE_FORMAT} /> : null}
              </CardSubtitle>
              <CardText>
                {props.post.content}

                <div className="mt-2">
                  {props.post.completed ?   <Card style={{backgroundColor:"#B4F8C8"}}> Completed </Card> :   <Card style={{backgroundColor:"#FFAEBC"}}> Not Completed </Card> }
                </div>
              </CardText>
              <Row>
                <Col>
                  <div className="btn-group flex-btn-group-container">
                    <Button tag={Link} to={`${props.match.url}/${props.post.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                      <FontAwesomeIcon icon="eye" />{' '}
                      <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.view">View</Translate>
                            </span>
                    </Button>
                    {/*TODO: when clicking on edit it does not go on the page, it goes only if the page is reloaded*/}
                    {props.post.poster.id === props.account_id || props.account_login === "admin" ?
                      <Link to={{
                        pathname: `${props.match.url}/${props.post.id}/edit?page=${props.paginationState.activePage}&sort=${props.paginationState.sort},${props.paginationState.order}`,
                        state: {
                          account: {account_id: props.account_id, login: props.account_login},
                          post_data: props.post
                        }
                      }} className="btn btn-primary jh-create-entity" id="jh-create-entity"
                            data-cy="entityUpdateButton">
                        <FontAwesomeIcon icon="pencil-alt"/>{' '}
                        <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.edit">Edit</Translate>
                            </span>
                      </Link>

                      :<div></div>}

                    {props.post.poster.id === props.account_id || props.account_login === "admin" ?
                      <Button
                      tag={Link}
                      to={`post/${props.post.id}/delete?page=${props.paginationState.activePage}&sort=${props.paginationState.sort},${props.paginationState.order}`}
                      color="danger"
                      size="sm"
                      data-cy="entityDeleteButton"
                      >

                      <FontAwesomeIcon icon="trash" />{' '}
                      <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.delete">Delete</Translate>
                      </span>
                      </Button>
                      : <div></div>
                    }



                    {/*//account.id e idul accountului*/}
                    {/*//post.id e idup postului*/}
                  </div>
                </Col>
                <Col className="flex">
                  <Link to={{pathname: `comment/new` , state : {account :{account_id: props.account_id,login:props.account_login}, post_data : props.post} }}  className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
                    <FontAwesomeIcon icon="plus" />
                    &nbsp;
                    <Translate contentKey="ihelpApp.comment.home.createLabel">Create new Comment</Translate>
                  </Link>
                </Col>
              </Row>


              <Card
                className="border m-1 shadow-sm vw-90 card-container"
              >
                <Button onClick={()=>{
                  toggle()}} className="justify-content-center d-flex">
                  Show All Comments For Post
                </Button>
                <Collapse isOpen={isOpen}>
                  <CardText className="card-text-sm" aria-expanded="false">
                    {filter_comments_by_post.map((comment,y) => {
                      return(                   <div key={`entity-${y}`}>
                        {/*TODO: this should be done for each child in a separate map*/}
                        <div className="card">
                          <div className="card-header">
                            {comment.author.email}
                          </div>
                          <div className="card-body">
                            <blockquote className="blockquote mb-0">
                              <p>{comment.content}</p>
                              <footer className="blockquote-footer">{comment.date}</footer>
                            </blockquote>
                          </div>
                        </div>
                      </div>)
                    })}
                  </CardText>
                </Collapse>


              </Card>

            </CardBody>



          </Card>
        </div>
    )
}

export  default  PostItem;
