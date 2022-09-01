// Hooks
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// Components
import styled from 'styled-components';
import Button from '../UI/Button';
// Store
import { clearComment, globalEditModeToggle, __getComment } from '../../redux/modules/commentSlice';
import { __deleteComment, __updateComment } from '../../redux/modules/commentsSlice';

const Comment = ({ comment }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [updateContent, setUpdateContent] = useState('');

  const { content } = useSelector((state) => state.comment.comment);
  const { globalEditMode } = useSelector((state) => state.comment);

  useEffect(() => {
    setUpdateContent(content);
  }, [content]);

  const onDeleteHandler = () => {
    const answer = window.confirm('이 댓글을 지울까요?');
    if (answer) {
      dispatch(__deleteComment(comment.id));
    } else {
      return;
    }
  };

  const onSaveHandler = () => {
    dispatch(
      __updateComment({
        id: +comment.id,
        content: updateContent,
        userId: comment.userId,
        postId: id,
      })
    );
    setEditMode(false);
    dispatch(globalEditModeToggle(false));
  };

  const onEditHandler = () => {
    setEditMode(true);
    dispatch(__getComment(comment.id));
    dispatch(globalEditModeToggle(true));
  };

  const onCancelHandler = () => {
    setEditMode(false);
    dispatch(clearComment());
    dispatch(globalEditModeToggle(false));
  };

  return (
    <CommentStyle>
      <NameDiv>
        <MarginSpan>{comment.userId}</MarginSpan>
      </NameDiv>
      <CommentDiv>
        {editMode ? (
          <>
            <Textarea type='text' value={updateContent} onChange={(event) => setUpdateContent(event.target.value)} />
            <ButtonDiv>
              <Button edit onClick={onCancelHandler}>
                취소
              </Button>
              <Button delete onClick={onSaveHandler}>
                완료
              </Button>
            </ButtonDiv>
          </>
        ) : (
          <>
            <MarginSpan>{comment.content}</MarginSpan>
            <ButtonDiv>
              <Button edit disabled={globalEditMode} onClick={onEditHandler}>
                수정
              </Button>
              <Button delete disabled={globalEditMode} onClick={onDeleteHandler}>
                삭제
              </Button>
            </ButtonDiv>
          </>
        )}
      </CommentDiv>
    </CommentStyle>
  );
};

const CommentStyle = styled.div`
  width: 60%;
  border-bottom: 1px solid lightblue;
  display: flex;
  align-items: center;
  margin: 10px auto;
  overflow: hidden;
`;
const NameDiv = styled.div`
  /* flex-grow: 2; */
  /* border: 1px dashed red; */
  margin-right: 30px;
  width: 20%;
  text-align: right;
`;

const CommentDiv = styled.div`
  text-align: left;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonDiv = styled.div`
  text-align: right;
  /* width: 25%; */
`;

const MarginSpan = styled.span`
  margin-left: 10px;
  width: 60%;
`;

const Textarea = styled.textarea`
  width: 65%;
  resize: none;
`;
export default Comment;
