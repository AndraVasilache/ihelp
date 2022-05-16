import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/shared/reducers/user-management';
import { getEntity, updateEntity, createEntity, reset } from './post.reducer';
import { IPost } from 'app/shared/model/post.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { Tag } from 'app/shared/model/enumerations/tag.model';
import { Type } from 'app/shared/model/enumerations/type.model';

export const PostUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const users = useAppSelector(state => state.userManagement.users);
  const postEntity = useAppSelector(state => state.post.entity);
  const loading = useAppSelector(state => state.post.loading);
  const updating = useAppSelector(state => state.post.updating);
  const updateSuccess = useAppSelector(state => state.post.updateSuccess);
  const tagValues = Object.keys(Tag);
  const typeValues = Object.keys(Type);
  const handleClose = () => {
    props.history.push('/post' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...postEntity,
      ...values,
      poster: users.find(it => it.id.toString() === values.poster.toString()),
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
          tags: 'Urgent',
          types: 'Request',
          ...postEntity,
          poster: postEntity?.poster?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ihelpApp.post.home.createOrEditLabel" data-cy="PostCreateUpdateHeading">
            <Translate contentKey="ihelpApp.post.home.createOrEditLabel">Create or edit a Post</Translate>
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
                  id="post-id"
                  label={translate('ihelpApp.post.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField label={translate('ihelpApp.post.content')}
                              id="post-content"
                              name="content"
                              data-cy="content"
                              type="text" />
              <ValidatedField
                label={translate('ihelpApp.post.location')}
                id="post-location"
                name="location"
                data-cy="location"
                type="text"
              />
              <ValidatedField
                label={translate('ihelpApp.post.verified')}
                id="post-verified"
                name="verified"
                data-cy="verified"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('ihelpApp.post.completed')}
                id="post-completed"
                name="completed"
                data-cy="completed"
                check
                type="checkbox"
              />
              <ValidatedField label={translate('ihelpApp.post.tags')} id="post-tags" name="tags" data-cy="tags" type="select">
                {tagValues.map(tag => (
                  <option value={tag} key={tag}>
                    {translate('ihelpApp.Tag.' + tag)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField label={translate('ihelpApp.post.types')} id="post-types" name="types" data-cy="types" type="select">
                {typeValues.map(type => (
                  <option value={type} key={type}>
                    {translate('ihelpApp.Type.' + type)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField id="post-poster" name="poster" data-cy="poster" label={translate('ihelpApp.post.poster')} type="select">
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.login}
                      </option>
                    ))
                  : null}
              </ValidatedField>
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

export default PostUpdate;
