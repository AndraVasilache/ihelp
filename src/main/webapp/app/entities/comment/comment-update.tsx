import React, { useState, useEffect } from 'react';
import {Link, RouteComponentProps, useLocation} from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/shared/reducers/user-management';
import { IPost } from 'app/shared/model/post.model';
import { getEntities as getPosts } from 'app/entities/post/post.reducer';
import { getEntity, updateEntity, createEntity, reset } from './comment.reducer';
import { IComment } from 'app/shared/model/comment.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';


export const CommentUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();
  const data = useLocation()
  const data_destructurised = data.state
  console.log(data.state)
  console.log("Here is state data")
  const author_id = "4c973896-5761-41fc-8217-07c5d13a004b"
  const post_id = "1251"
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const users = useAppSelector(state => state.userManagement.users);
  const posts = useAppSelector(state => state.post.entities);
  const commentEntity = useAppSelector(state => state.comment.entity);
  const loading = useAppSelector(state => state.comment.loading);
  const updating = useAppSelector(state => state.comment.updating);
  const updateSuccess = useAppSelector(state => state.comment.updateSuccess);
  const handleClose = () => {
    props.history.push('/post');
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getUsers({}));
    dispatch(getPosts({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);



  const saveEntity = values => {

    console.log({
      "id": 1251,
      "date": "2022-05-17",
      "content": "dsdsa",
      "location": "fsafsafs",
      "verified": true,
      "completed": false,
      "tags": "Housing",
      "types": "Offer",
      "poster": {
        "id": "4c973896-5761-41fc-8217-07c5d13a004b",
        "login": "admin",
        "firstName": "Admin",
        "lastName": "Administrator",
        "email": "admin@localhost",
        "activated": true,
        "langKey": "en",
        "imageUrl": null,
      }});
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log(data_destructurised.post_data)
    console.log({id:author_id,login:"admin"})
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log({id:data_destructurised.account.account_id,login:data_destructurised.account.login})


    const entity = {
      ...commentEntity,
      ...values,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      author: {id:data_destructurised.account.account_id,login:data_destructurised.account.login},
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      post: data_destructurised.post_data
      };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...commentEntity,
          author: commentEntity?.author?.id,
          post: commentEntity?.post?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ihelpApp.comment.home.createOrEditLabel" data-cy="CommentCreateUpdateHeading">
            <Translate contentKey="ihelpApp.comment.home.createOrEditLabel">Create or edit a Comment</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="comment-id"
                  label={translate('ihelpApp.comment.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('ihelpApp.comment.content')}
                id="comment-content"
                name="content"
                data-cy="content"
                type="text"
              />

              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/post" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CommentUpdate;
