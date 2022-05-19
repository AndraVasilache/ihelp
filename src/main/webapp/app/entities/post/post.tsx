import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import {Button, Card, CardBody, Row, CardSubtitle, CardText, CardTitle, Col, Collapse} from 'reactstrap';
import { Translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PostItem from './postItem'
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
            {postList.map((post, i) => {
             return (
               <div key={`entity-${i}`}>
               <PostItem post={post} commentListFilteredWithUserId={commentList} i={i} account_login={account.login} account_id={account.id} paginationState={paginationState} match={match} postList={postList}  history={history}/>
               </div>
             )})}
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
