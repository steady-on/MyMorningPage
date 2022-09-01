// Hooks
import { useNavigate } from "react-router-dom";
// Components
import styled from "styled-components";
// 기타 라이브러리
import { BsBook } from "react-icons/bs";

const Logo = () => {
  let navigate = useNavigate();

  return (
    <LogoBox>
      <BsBook
        onClick={() => {
          navigate("/");
        }}
        className="logo"
      />
    </LogoBox>
  );
};

const LogoBox = styled.div`
  width: 40px;
  margin-top: 10px;
  margin-left: 5px;
  cursor: pointer;

  .logo {
    font-size: 30px;
    color: #13335c;
  }
`;

export default Logo;
