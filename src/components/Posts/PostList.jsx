// Hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Components
import Post from "./Post";
import styled from "styled-components";
// Store
import { __getPosts } from "../../redux/modules/postsSlice";

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(__getPosts());
  }, [dispatch]);

  if (posts.length === 0)
    return (
      <div>
        <H2>
          아직 게시글이 없어요 ｡:ﾟ(;´∩`;)ﾟ:｡
          <br /> 첫번째 글의 주인공이 되어 보시는건 어떨까요?{" "}
        </H2>
      </div>
    );

  if (error) return <div>알 수 없는 에러가 발생했습니다.</div>;

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

const H2 = styled.h3`
  text-align: center;
  margin: 100px 0;
`;
export default PostList;
