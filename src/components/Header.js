import React from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { signOutAPI } from '../actions';
import { signOut } from 'firebase/auth';

const Header = (props) => {
  return (
        <Container>
            <Content>
                <Logo>
                    <a href="/home">
                    <img src="/images/home-logo.png" alt=""/> {/*linkedin logo at top of home*/}
                    </a>
                </Logo>
                <Search>
                    <div>
                        <input type="text" placeholder='Search'/>
                    </div>
                    <SearchIcon>
                        <img src="/images/search-icon.png" alt=""/> 
                    </SearchIcon>
                </Search>
                <Nav>
                   <NavListWrap>
                    <NavList className='activeDefault'>
                      <a>
                        <img src="/images/nav-home.png" alt=""/> {/*right top side me home in normal screen, in phone bottom left me*/} 
                        <span>Home</span> 
                        </a>
                        </NavList>
                        
                    <NavList>
                      <a>
                        <img src="/images/nav-network.png" alt=""/> {/*right top side me home in normal screen, in phone bottom left me*/} 
                        <span>My Network</span> 
                      </a>
                    </NavList>

                    <NavList>
                      <a>
                        <img src="/images/nav-jobs.png" alt=""/> {/*right top side me home in normal screen, in phone bottom left me*/} 
                        <span>Jobs</span> 
                      </a>
                    </NavList>

                    <NavList>
                      <a>
                        <img src="/images/nav-messaging.png" alt=""/> {/*right top side me home in normal screen, in phone bottom left me*/} 
                        <span>Messaging</span> 
                      </a>
                    </NavList>

                    <NavList>
                      <a>
                        <img src="/images/nav-notifications.png" alt=""/> {/*right top side me home in normal screen, in phone bottom left me*/} 
                        <span>Notifications</span> 
                      </a>
                    </NavList>

                      <User>
                        <a>   {/*login user ka photo jo aa rha wo display kro warna default ko set */}
                          { props.user && props.user.photoURL ? (
                          <img src={props.user.photoURL} alt="" />
                          ) : (
                          <img src="/images/user.png" alt="" /> 
                          )} 
                          <span>Me
                           <img src="/images/down-icon.png" alt=""/>
                           </span>
                        </a>
                        <SignOut onClick={() => props.signOut()}>  {/*hover pe User Me aega sign out box */}
                          <a>
                            Sign Out
                          </a>
                        </SignOut>
                      </User>

                      <Work>
                         <a>
                            <img src="/images/nav-work.png" alt="" />
                                <span>Work</span>
                                <img src="/images/down-icon.png" alt=""/>
                        </a>
                      </Work>
                   
                   </NavListWrap>
                </Nav>
            </Content>
        </Container>
  );
};

const Container = styled.div`
background-color: white;
border-bottom: 1px solid rgba(0,0,0,0.08);
left: 0;
padding: 0 24px;
position: fixed;
top: 0;
width: 100vw;
z-index: 100;
`;

const Content = styled.div`
display: flex;
align-items: center;
margin: auto;
min-height: 100%;
max-width: 1120px;
`;

const Logo = styled.span`
margin-right: 8px;
font-size: 0px;
`;

const Search = styled.div`
opacity: 1;
flex-grow: 1;
position: relative;
& > div {
    max-width: 280px;
    input {
        border: none;
        box-shadow: none;
        background-color: #eef3f8;
        border-radius: 2px;
        color: rgba(0,0,0,0.9);
        width: 218px;
        padding: 0 8px 0 40px;
        line-height: 1.75;
        font-weight: 400;
        font-size: 15px;
        height: 34px;
        border-color: #dce6f1;
        vertical-align: text-top;
    }     
}
`;

const SearchIcon = styled.div`
width: 40px;
position: absolute;
z-index: 1;
top: 10px;
left: 2px;
border-radius: 0 2px 2px 0;
margin: 0;
pointer-events: none;
display: flex;
justify-content: center;
align-items: center;
`;

const Nav = styled.nav`
margin-left: auto;
display: block;
@media (max-width: 768px){
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;
}
`;

const NavListWrap = styled.ul`
display: flex;
flex-wrap: nowrap;
list-style-type: none ;

.activeDefault{
    span:after{
        content: '';
        transform: scaleX(1);
        border-bottom: 2px solid var(--white, #fff);
        bottom: 0;
        left: 0;
        position: absolute;
        transition:  transform 0.2s ease-in-out;
        width: 100%;
        border-color: rgba(0,0,0,0.9);
    }
}
`;

const NavList = styled.li`
display: flex;
align-items: center;
a{
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 53px;
    min-width: 80px;
    position: relative;
    text-decoration: none;
    span{
        color: rgba(0,0,0,0,6);
        display: flex;
        align-items: center;
    }
    @media (max-width){
        min-width: 70px;
    }
}
&:hover, &:active{
  a{
    span{
        color: rgba(0,0,0,0.9);
    }
  }
}
`;

const SignOut = styled.div`
position: absolute;
top: 45px;
background: white;
border-radius: 0 0 5px 5px;
width: 100px;
height: 40px;
font-size: 16px;
transition-duration: 167ms;
text-align: center;
display: none;  // sirf hover krne pe aaye
`;


const User = styled(NavList)`    //already created template
a > png {
    width: 24px;
    border-radius: 50 ;
}
a > img{   //user image and Me
  width: 24px; 
  height:  24px;
  border-radius: 50%;
}
span{
  display: flex;
  align-items: center;
}

&:hover{
  ${SignOut}{
    align-items: center;
    display: flex;
    justify-content: center;
  }
}

`;

const Work = styled(User)`
border-left: 1px solid rgba(0,0,0,0.08);
`;

const mapStateToProps = (state) => {
   return {
      user: state.userState.user,
   };
}; 

const mapDispatchToProps = (dispatch) => ({
 signOut: () => dispatch(signOutAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
