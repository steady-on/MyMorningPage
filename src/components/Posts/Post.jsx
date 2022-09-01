// Hooks
import { useNavigate } from "react-router-dom";
// Components
import styled from "styled-components";

const Post = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div>
      <ContainerDiv
        onClick={() => {
          navigate(`/detail/${post.id}`);
        }}
      >
        <SpanTitle>{post.title}</SpanTitle>
        <SpanName>{post.userId}</SpanName>
      </ContainerDiv>
    </div>
  );
};

const ContainerDiv = styled.div`
  width: 60%;
  display: flex;
  margin: auto;
  padding: 30px 0;
  justify-content: center;
  border-bottom: 1px solid lightblue;
  cursor: pointer;
  &:hover{
    background-color:#f3f3f3;
  }
`;
const SpanTitle = styled.div`
  width: 400px;
  // border: 1px solid red;
  margin: 0 5px;
  padding: 0 10px;
`;
const SpanName = styled.div`
  width: 300px;
  // border: 1px solid #000;
  padding: 0 10px;
  text-align: right;
`;
export default Post;
