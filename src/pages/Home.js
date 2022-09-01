// Hooks
import { useNavigate } from "react-router-dom";
// Components
import styled from "styled-components";
import Layout from "../components/UI/Layout";
import Container from "../components/UI/Container";
import Button from "../components/UI/Button";
import PostList from "../components/Posts/PostList";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Layout title="My Morning Page">
      <Container>
        <TitleBox>
          <TitleH2>글 목록</TitleH2>
          <Button
            add
            onClick={() => {
              navigate("/write");
            }}
          >
            글쓰기
          </Button>
        </TitleBox>
        <PostList />
      </Container>
    </Layout>
  );
};

export default Home;

const TitleBox = styled.div`
  width: 60%;
  margin: 10px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
`;

const TitleH2 = styled.h2`
  margin: 0;
`;
