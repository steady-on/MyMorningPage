// Components
import styled from "styled-components";
import titleHeaderImg from "../../static/titleHeader.jpg";

const TitleHeader = ({ title }) => {
  return (
    <TitleHeaderBox>
      <HomeTitle>{title}</HomeTitle>
    </TitleHeaderBox>
  );
};

const TitleHeaderBox = styled.div`
  margin: auto;
  height: 200px;
  display: flex;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.5),
      rgba(178, 244, 254, 0.5)
    ),
    url(${titleHeaderImg});
  background-position: center;
  background-size: cover;
  background-color: #eee;
  font-family: "IM_Hyemin-Bold";
`;
const HomeTitle = styled.div`
  margin: auto;
  font-size: 30px;
  color: #fff;
`;

export default TitleHeader;
