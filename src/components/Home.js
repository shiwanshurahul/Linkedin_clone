import React from 'react';
import styled from 'styled-components'
import LeftSide from './LeftSide';
import Main from './Main';
import RightSide from './RightSide';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const Home = (props) => {
  return (
    <Container>
      {!props.user && <Navigate to='/'/>}
      <Section>
        <h5>
          <a>Hiring in a hurry? - </a>
          </h5>
          <p>Find talented pros in record time with upwork and keep business growing
          </p>
      </Section>

      {/*grid layout: */}
      <Layout>  {/* -> home ko 3 components me divide kr rha */}
        <LeftSide/> 
        <Main />
        <RightSide/>
      </Layout>
    </Container>
      
  );
};

const Container = styled.div`
padding-top: 73px;
max-width: 100%;
`;

const Content = styled.div`
max-width: 1128px;
margin-left: auto;
margin-right: auto;
`;

const Section = styled.section`
min-height: 50px;
padding: 16px 0;
box-sizing: content-box;
text-align: center;
text-decoration: underline;
display: flex;
justify-content: center;
h5{
  color: #0a66c2;
  font-size: 14px;
  a{
    font-weight: 700;
  }
}
p{
  font-size: 14px;
  color: #434649;
  font-weight: 600;
}
@media (max-width: 768px){
  flex-direction: column;
  padding: 0 5px;
  p{                //color change of text on mobile
    color: red;
  }
}
`;

const Layout = styled.div`
display: grid;
grid-template-areas: "leftside main rightsidse";
grid-template-columns: minmax(0,5fr) minmax(0,12fr) minmax(300px,7fr);
column-gap: 25px;
row-gap: 25px;
grid-template-rows: auto;
margin: 5px 0;
@media (max-width: 768px){
  display: flex;
  flex-direction: column;
  padding: 0 5px;
}
`;

const mapStatetoProps = (state) => {
  return {
    user: state.userState.user,
  }
};

export default connect(mapStatetoProps)(Home);
