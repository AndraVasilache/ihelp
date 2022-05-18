import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import {Button, Card, CardBody, Row, CardSubtitle, CardText, CardTitle, Col, Collapse} from 'reactstrap';
import { Translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './post.reducer';
import { IPost } from 'app/shared/model/post.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { IComment, defaultValue } from 'app/shared/model/comment.model';
import {IQueryParams} from "app/shared/reducers/reducer.utils";

export const Post = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  //TODO: trebuie sa se faca dispatch nu prea intelrg cum

  // const getComments = createAsyncThunk('comment/fetch_entity_list', async ({ page, size, sort }: IQueryParams) => {
  //   const requestUrl = `api/comments${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}cacheBuster=${new Date().getTime()}`;
  //   return axios.get<IComment[]>(requestUrl);
  // });

  // console.log("dsadsadsadsa")
  // console.log(getEntities({
  //   page: paginationState.activePage - 1,
  //   size: paginationState.itemsPerPage,
  //   sort: `${paginationState.sort},${paginationState.order}`,
  // }))

  const postList = useAppSelector(state => state.post.entities);
  const loading = useAppSelector(state => state.post.loading);
  const totalItems = useAppSelector(state => state.post.totalItems);
  const account = useAppSelector(state => state.authentication.account);
  //TODO: de ce naiba nu se randeaza din prima ?
  const commentList = useAppSelector(state => state.comment.entities);
  const commentListFilteredWithUserId = commentList.filter(comment => comment.author.id === account.id)
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const { match } = props;

  return (
    <div>
      <h2 id="post-heading" data-cy="PostHeading">
        <Translate contentKey="ihelpApp.post.home.title">Posts</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="ihelpApp.post.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={{pathname: `post/new` , state : {account :{account_id: account.id,login:account.login}}}} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="ihelpApp.post.home.createLabel">Create new Post</Translate>
          </Link>
        </div>
      </h2>


      <div className="table-responsive">
        {postList && postList.length > 0 ? (
          <div>
            {postList.map((post, i) => (
              <div key={`entity-${i}`}>
                <div>
                  <Card>
                    <CardBody>
                      <CardTitle tag="h5">
                        <Row>
                          <Col >
                            <Translate contentKey={`ihelpApp.Tag.${post.tags}`} /> { }
                            <Translate contentKey={`ihelpApp.Type.${post.types}`} />
                          </Col>
                          <Col>
                            {post.verified ?  <h4 style={{color:"green"}}>Verified</h4> :  <h4 style={{color:"red"}}>Not Verified</h4> }
                          </Col>
                        </Row>
                      </CardTitle>

                      <CardSubtitle className="mb-2 text-muted " tag="h6">
                        {post.date ? <TextFormat type="date" value={post.date} format={APP_LOCAL_DATE_FORMAT} /> : null}
                      </CardSubtitle>
                      <CardText>
                        {post.content}

                        <div className="mt-2">
                          {post.completed ?   <Card style={{backgroundColor:"#B4F8C8"}}> Completed </Card> :   <Card style={{backgroundColor:"#FFAEBC"}}> Not Completed </Card> }
                        </div>
                      </CardText>
                      <Row>
                        <Col>
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${post.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.view">View</Translate>
                            </span>
                            </Button>
                              {/*TODO: when clicking on edit it does not go on the page, it goes only if the page is reloaded*/}
                              <Link to={{pathname: `${match.url}/${post.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`,state : {account :{account_id: account.id,login:account.login}, post_data : post}}} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityUpdateButton" >
                                <FontAwesomeIcon icon="pencil-alt" />{' '}
                                <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.edit">Edit</Translate>
                            </span>
                              </Link>
                            <Button
                              tag={Link}
                              to={`post/${post.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                              color="danger"
                              size="sm"
                              data-cy="entityDeleteButton"
                            >

                              <FontAwesomeIcon icon="trash" />{' '}
                              <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.delete">Delete</Translate>
                            </span>
                            </Button>

                            {/*//account.id e idul accountului*/}
                            {/*//post.id e idup postului*/}
                          </div>
                        </Col>
                        <Col className="flex">
                          <Link to={{pathname: `comment/new` , state : {account :{account_id: account.id,login:account.login}, post_data : post} }}  className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
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
                          console.log(commentListFilteredWithUserId)
                          toggle()}} className="justify-content-center d-flex">
                          Show All Comments
                        </Button>
                        <Collapse isOpen={isOpen}>
                          <CardText className="card-text-sm" aria-expanded="false">
                            {commentListFilteredWithUserId.map((comment,y) => {
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
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="ihelpApp.post.home.notFound">No Posts found</Translate>
            </div>
          )
        )}

      </div>
      {totalItems ? (
        <div className={postList && postList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Post;
