import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './post.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const PostDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const postEntity = useAppSelector(state => state.post.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="postDetailsHeading">
          <Translate contentKey="ihelpApp.post.detail.title">Post</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="ihelpApp.post.id">Id</Translate>
            </span>
          </dt>
          <dd>{postEntity.id}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="ihelpApp.post.date">Date</Translate>
            </span>
          </dt>
          <dd>{postEntity.date ? <TextFormat value={postEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="content">
              <Translate contentKey="ihelpApp.post.content">Content</Translate>
            </span>
          </dt>
          <dd>{postEntity.content}</dd>
          <dt>
            <span id="location">
              <Translate contentKey="ihelpApp.post.location">Location</Translate>
            </span>
          </dt>
          <dd>{postEntity.location}</dd>
          <dt>
            <span id="verified">
              <Translate contentKey="ihelpApp.post.verified">Verified</Translate>
            </span>
          </dt>
          <dd>{postEntity.verified ? 'true' : 'false'}</dd>
          <dt>
            <span id="completed">
              <Translate contentKey="ihelpApp.post.completed">Completed</Translate>
            </span>
          </dt>
          <dd>{postEntity.completed ? 'true' : 'false'}</dd>
          <dt>
            <span id="tags">
              <Translate contentKey="ihelpApp.post.tags">Tags</Translate>
            </span>
          </dt>
          <dd>{postEntity.tags}</dd>
          <dt>
            <span id="types">
              <Translate contentKey="ihelpApp.post.types">Types</Translate>
            </span>
          </dt>
          <dd>{postEntity.types}</dd>
          <dt>
            <Translate contentKey="ihelpApp.post.poster">Poster</Translate>
          </dt>
          <dd>{postEntity.poster ? postEntity.poster.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/post" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/post/${postEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PostDetail;
