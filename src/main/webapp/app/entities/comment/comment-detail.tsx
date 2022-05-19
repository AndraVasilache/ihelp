import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './comment.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const CommentDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const commentEntity = useAppSelector(state => state.comment.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="commentDetailsHeading">
          <Translate contentKey="ihelpApp.comment.detail.title">Comment</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="ihelpApp.comment.id">Id</Translate>
            </span>
          </dt>
          <dd>{commentEntity.id}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="ihelpApp.comment.date">Date</Translate>
            </span>
          </dt>
          <dd>{commentEntity.date ? <TextFormat value={commentEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="content">
              <Translate contentKey="ihelpApp.comment.content">Content</Translate>
            </span>
          </dt>
          <dd>{commentEntity.content}</dd>
          <dt>
            <Translate contentKey="ihelpApp.comment.author">Author</Translate>
          </dt>
          <dd>{commentEntity.author ? commentEntity.author.email : ''}</dd>
          <dt>
            <Translate contentKey="ihelpApp.comment.post">Post</Translate>
          </dt>
          <dd>{commentEntity.post ? commentEntity.post.content : ''}</dd>
        </dl>
        <Button tag={Link} to="/comment" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/comment/${commentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CommentDetail;
