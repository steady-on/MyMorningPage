import styled from "styled-components";
// Components
import Logo from "./Logo";
import TitleHeader from "./TitleHeader";

const Layout = (props) => {
  return (
    <LayoutBox>
      <Logo />
      <TitleHeader title={props.title} />
      {props.children}
    </LayoutBox>
  );
};

const LayoutBox = styled.div`
  max-width: 1000px;
  min-width: 800px;
  overflow: hidden;
  margin: auto;
`;

export default Layout;
