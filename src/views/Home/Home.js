import React, { useEffect, useState } from 'react';
import TitleComponent from '@/container/DefaultLayout/TitleComponent';
import { getPosts, addPost, deletePost } from '@/store/actions/posts';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loadProfileImage } from '@/utils/loadProfileImage';
import { formatDistanceToNow } from 'date-fns';
import Spinner from '@/components/Spinner';
import { useToast } from '@/hooks/useToast';
import Empty from '@/components/Empty';

function Home() {
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const { error } = useSelector((state) => state.error);
  const { user } = useSelector((state) => state.user);
  const { toast } = useToast();

  useEffect(() => {
    getPosts(dispatch, setLoading);
  }, [JSON.stringify(posts), JSON.stringify(error)]);

  const handleSubmit = (e) => {
    // e.preventDefault();
    // take content and send to backend
    addPost(dispatch, setAddLoading, { content }).catch(() =>
      toast?.error(error?.message),
    );
    setContent('');
  };

  const handleDelete = (id) => {
    deletePost(dispatch, setRemoveLoading, id).catch(() =>
      toast?.error(error?.message),
    );
  };

  const contentLoading = !content || loading || addLoading;

  return (
    <>
      <TitleComponent title="Dashboard" />
      <section className="default-inner__end--shared default-inner__end__post--submit shadow">
        <figure className="user__avatar">{loadProfileImage(user, 40)}</figure>
        <section className="default-inner__end__text">
          <textarea
            name="content"
            id="post-id"
            placeholder="Say something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </section>
        <button
          className={`btn btn-success${contentLoading ? ' disabled' : ''}`}
          type="button"
          onClick={handleSubmit}
        >
          <span>
            <FontAwesomeIcon icon="link" />
          </span>
          <span>Post</span>
        </button>
      </section>
      {loading ? (
        <Spinner />
      ) : posts?.length === 0 ? (
        <Empty />
      ) : (
        posts?.map((post) => (
          <Post
            post={post}
            user={post?.user}
            current={user}
            key={post._id}
            handleDelete={handleDelete}
          />
        ))
      )}
    </>
  );
}

const Post = ({ user, post, handleDelete, current }) => {
  return (
    <section className="default-inner__end--shared default-inner__end__post shadow">
      <section className="default-inner__end__post__start">
        <div className="left">
          <figure className="user__avatar">{loadProfileImage(user, 40)}</figure>
          <section className="user__details">
            <h5 className="user__title">
              {user?.name} {user?.surname}
            </h5>
            <h6 className="user__subtitle">
              {formatDistanceToNow(new Date(post?.createdAt), {
                addSuffix: true,
              })}
            </h6>
          </section>
        </div>

        {current?.id === post?.user?.id && (
          <button
            className="btn btn-link"
            title="🗑️"
            onClick={() => handleDelete(post._id)}
            type="button"
          >
            <FontAwesomeIcon icon="trash-alt" />
          </button>
        )}
      </section>
      <section className="default-inner__end__post__end">
        <p>{post?.content}</p>
      </section>
    </section>
  );
};

export default Home;
