import React from "react";
import styled from "styled-components";
import { connect } from 'react-redux';
import { signInAPI } from "../actions";

import { Navigate } from "react-router-dom";

const Login = (props) => {
    return (
         <Container>
         {
            props.user && <Navigate to='/home' />
         }
            <Nav>
                <a href="/">
                 <img src="/images/login-logo.png" alt="" />
                </a>

                <div>
                  <join>Join now</join>
                  <SignIn>Sign In</SignIn>
                </div>
            </Nav>
            <Section>
              <Hero>
                <h1>Welcome to your professional community</h1>
                <img src="/images/login-hero.png" alt=""/>
              </Hero>
              <Form>
                <Google onClick={props.signIn}>   {/*signIn is arrow funtion defined inside mapDispatchToProps */}
                  <img src="/images/google.png" alt="" />
                  Sign in with Google
                </Google>
              </Form>
              </Section>
    </Container>
    );
};

const Container = styled.div`
    padding: 0px;
  `;

const Nav = styled.nav`
 max-width: 1128px;
 margin: auto;
 padding: 12px 0 16px;
 display: flex;
 align-items: center;
 position: relative;
 justify-content: space-between;
 flex-wrap: nowrap;

 & > a {   //anything inside a ko ye properties do
   width: 135px;
   height: 34px;
   @media (max-width: 768px){   //on phone
      padding: 0 5px;
   }
 }
 /* & > div{
  display: flex;
  align-items: center;
  justify-content: flex-end ; 
  width: 100%;
 } */
 `;

const join =styled.a`
  font-size: 16px;
  padding: 10px 12px;
  text-decoration: none;  //no underline
  border-radius: 4px; //rounded corner
  color: rgba(0,0,0,0.6);
  margin-right: 12px;

  &:hover {
    background-color: rbga(0,0,0,0.08);
    color: rgba(0,0,0,0.9);
    text-decoration: none;
  }
`;

const SignIn = styled.a`
 box-shadow: inset 0 0 0 1px #0a66c2;
 color: #0a66c2; 
 border-radius: 24px;
 transition-duration: 167ms;
 font-size: 16px;
 font-weight: 600;
 line-height: 40px;
 padding: 10px 24px;
 text-align: center;
 background-color: rgba(0,0,0,0);
 &:hover{
    background-color: rgba(112, 181, 249, 0.15);
    color: #0a66c2;
    text-decoration: none;
   }
`;

const Section = styled.section`
display: flex;
align-content: start;  //how flex lines are distributed along the vertical axis in a flexbox container
min-height: 700px;
padding-bottom: 138px;
padding-top: 40px;
padding: 60px 0;
position: relative;
flex-wrap: wrap;
width: 100%;
max-width: 1128px;
align-items: center;
margin: auto;
@media (max-width: 768px) {
   margin: auto;
   min-height: 0px;
}
`;

const Hero = styled.div`
   width: 100%;
   h1 {
    padding-bottom: 0;
    width: 55%;
    font-size: 56px;
    color: #2977c9;
    font-weight: 200;
    line-height: 70px;
    @media (max-width: 768px){
      text-align: center;
      font-size: 20px;
      width: 100%;
      line-height: 2;
    }
   }
   //outside of h1
   img{
     /* z-index: -1;  //img ka priority sbse jyada ni de rhe */
     width: 700px;
     height: 670px;
     position: absolute;
     bottom: -2px;
     right: -50px;
     @media (max-width: 768px){
       top: 230px;
       width: initial;
       position: initial;
       height: initial;
     }
    }
`;

const Form = styled.div`
  margin-top: 100px;
  width: 408px;
  @media (max-width: 768px){
    margin-top: 20px;
  }
`;

const Google = styled.button`
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 56px;
  width: 100%;
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),
             inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0%);
  vertical-align: middle;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  color: rgba(0,0,0,0.6);
  &:hover{
    background-color: rgba(207,207,207,0.25);
    color: rgba(0,0,0,0.75);
  }
`;

const mapStateToProps = (state) => {  //redux toolkit se ni krna pdta
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signIn: () => dispatch(signInAPI()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Login);