// Hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
// Components
import CommentForm from "./CommentForm";
import Comment from "./Comment";
// Store
import { __getComments } from "../../redux/modules/commentsSlice";
import styled from "styled-components";

const CommentList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { comments, error } = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(__getComments(id));
  }, [dispatch, id]);

  if (error) return <div>알 수 없는 에러가 발생했습니다.</div>;

  return (
    <div>
      <CommentForm postId={id}></CommentForm>
      {comments.length === 0 ? (
        <H2>
          아직 댓글이 없어요.
          <br />첫 댓글을 달아볼까요? ≡≡≡=(ﾉTдT)ﾉ
        </H2>
      ) : (
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))
      )}
    </div>
  );
};

const H2 = styled.h4`
  text-align: center;
`;
export default CommentList;
