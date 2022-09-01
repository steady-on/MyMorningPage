// Hooks
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// Components
import styled from 'styled-components';
import Button from '../UI/Button';
// Store
import { __deletePost } from '../../redux/modules/postsSlice';
import { clearPost, __getPostById, __updatePost } from '../../redux/modules/postSlice';

const PostDetail = ({ editMode, setEditMode, postId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateContent, setUpdateContent] = useState('');
  const post = useSelector((state) => state.post.post);

  useEffect(() => {
    dispatch(__getPostById(postId));
    return () => dispatch(clearPost());
  }, [dispatch, postId]);

  useEffect(() => {
    setUpdateContent(post.content);
  }, [post]);

  const onDeleteHandler = (event) => {
    event.stopPropagation();
    const answer = window.confirm('이 게시글을 지울까요?');
    if (answer) {
      dispatch(__deletePost(post.id));
      return navigate('/');
    } else {
      return;
    }
  };

  const onSaveHandler = () => {
    dispatch(
      __updatePost({
        ...post,
        content: updateContent,
      })
    );
    setEditMode(false);
  };

  return (
    <PostDetailBox>
      <TitleDiv>{post.title}</TitleDiv>
      <IdBox>작성자: {post.userId}</IdBox>
      {editMode ? (
        <>
          <ContentDiv>
            <TextArea
              type='text'
              value={updateContent}
              onChange={(event) => {
                setUpdateContent(event.target.value);
              }}
            />
          </ContentDiv>
          <ButtonDiv>
            <Button edit onClick={() => setEditMode(!editMode)}>
              취소
            </Button>
            <Button delete onClick={onSaveHandler}>
              완료
            </Button>
          </ButtonDiv>
        </>
      ) : (
        <>
          <ContentDiv type='text'>{post.content}</ContentDiv>
          <ButtonDiv>
            <Button edit onClick={() => setEditMode(!editMode)}>
              수정
            </Button>
            <Button delete onClick={onDeleteHandler}>
              삭제
            </Button>
          </ButtonDiv>
        </>
      )}
    </PostDetailBox>
  );
};

const PostDetailBox = styled.div`
  width: 60%;
  margin: auto;
`;

const TitleDiv = styled.h2`
  margin: 20px auto;
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid lightblue;
`;

const ContentDiv = styled.div`
  margin: auto;
  padding: 30px 20px;
  text-align: left;
  border-bottom: 1px solid lightblue;
  display: flex;
  justify-content: space-between;
  line-height: 1.5;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: right;
`;

const TextArea = styled.textarea`
  width: 96%;
  height: 200px;
  margin: 10px auto;
  resize: none;
  border: 1px solid #999;
  border-radius: 10px;
  padding: 10px;
`;

const IdBox = styled.div`
  font-weight: bold;
  text-align: right;
`;
export default PostDetail;
