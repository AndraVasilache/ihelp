import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import {Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Table} from 'reactstrap';
import { Translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './post.reducer';
import { IPost } from 'app/shared/model/post.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const Post = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  const postList = useAppSelector(state => state.post.entities);
  const loading = useAppSelector(state => state.post.loading);
  const totalItems = useAppSelector(state => state.post.totalItems);

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
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
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
                             <Translate contentKey={`ihelpApp.Tag.${post.tags}`} />
                           </CardTitle>
                           <CardSubtitle
                             className="mb-2 text-muted"
                             tag="h6">
                             <Translate contentKey={`ihelpApp.Type.${post.types}`} /> -
                             {post.date ? <TextFormat type="date" value={post.date} format={APP_LOCAL_DATE_FORMAT} /> : null}
                           </CardSubtitle>
                           <CardText>
                             {post.content}
                             <p>verified: {post.verified ? 'true' : 'false'}</p>
                             <p>completed: {post.completed ? 'true' : 'false'}</p>
                           </CardText>
                           <div className="btn-group flex-btn-group-container">
                             <Button tag={Link} to={`${match.url}/${post.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                               <FontAwesomeIcon icon="eye" />{' '}
                               <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.view">View</Translate>
                            </span>
                             </Button>
                             <Button
                               tag={Link}
                               to={`${match.url}/${post.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                               color="primary"
                               size="sm"
                               data-cy="entityEditButton"
                             >
                               <FontAwesomeIcon icon="pencil-alt" />{' '}
                               <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.edit">Edit</Translate>
                            </span>
                             </Button>
                             <Button
                               tag={Link}
                               to={`${match.url}/${post.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                               color="danger"
                               size="sm"
                               data-cy="entityDeleteButton"
                             >
                               <FontAwesomeIcon icon="trash" />{' '}
                               <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.delete">Delete</Translate>
                            </span>
                             </Button>
                           </div>
                         </CardBody>
                       </Card>
                     </div>
                   </div>
                  ))}
                </div>
          // <div>
          //   <Card
          //   >
          //     <CardBody>
          //       <CardTitle tag="h5">
          //         Card title
          //       </CardTitle>
          //       <CardSubtitle
          //         className="mb-2 text-muted"
          //         tag="h6"
          //       >
          //         Card subtitle
          //       </CardSubtitle>
          //       <CardText>
          //         Some quick example text to build on the card title and make up the bulk of the cards content.
          //       </CardText>
          //       <Button>
          //         Button
          //       </Button>
          //     </CardBody>
          //   </Card>
          // </div>
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
