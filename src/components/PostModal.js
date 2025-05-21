import React from "react";
import styled from "styled-components";
import { useState } from "react";
import ReactPlayer from "react-player"; //link se video display krta
import { connect } from "react-redux";

import firebase from "firebase/compat/app";
import { postArticleAPI } from "../actions";

const PostModal = (props) => {
    const [editorText, setEditorText] = useState('');
    const [shareImage, setShareImage] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [assetArea, setAssetArea] = useState('');

    const handleChange = (e) => {
        const image = e.target.files[0];

        if(image === '' || image === undefined){ // === checks the datatype also
            alert('not an image, the file is a ${typeof image}');
            return;
        }
        setShareImage(image);
    };

    const switchAssetArea = (area) =>{
        setShareImage('');
        setVideoLink('');
        setAssetArea(area);
    };

    const postArticle = (e) => {
        e.preventDefault();
        if(e.target !== e.currentTarget){
            return;
        }

        const payload = {
            image: shareImage,
            video: videoLink,
            user: props.user,
            description: editorText,
            Timestamp: firebase.firestore.Timestamp.now(),
        };
        props.postArticle(payload);
        reset(e);
    }; 

    const reset = (e) => {
        setEditorText('');
        setShareImage('');
        setVideoLink('');
        setAssetArea('');
        props.handleClick(e);
    };
    return (
        <>
        {  props.showModal ==='open'   &&   //only display component jb open aa rha props from main
    <Container>
        <Content>
            <Header>
        <h2>Create a post</h2>
        <button onClick={(event) => reset(event)}>
            <img src="/images/close_icon.png" alt=""/>
        </button>
            </Header>
            <SharedContent>
                <UserInfo>
                    { props.user.photoURL ? (<img src = {props.user.photoURL} alt=""/>
                     ) : (    
                    <img src="/images/user.png" alt="" />
                    )}
                    <span>{props.user.displayName}</span>
                </UserInfo>

             <Editor> {/*text area for eriting a post */}
                <textarea value= {editorText}
           onChange={(e) => setEditorText(e.target.value)}
           placeholder="What do u want to talk about"
           autoFocus={true}
           />
            { assetArea === 'image' ?

           <uploadImage>
              {/* style={{display: 'none'}} */}
               <input type="file" accept="image/gif, image/jpeg, image/jpg, image/png"
               name="image" id="File"  //choose File button not display
               onChange={handleChange}  //set image
              />
              <p>
                <label htmlFor="file">
                select an image to share
                </label>
              </p>

        {shareImage && <img src= {URL.createObjectURL(shareImage)} />} {/* URL.createObjectURL creates a string containing a URL representing the object/shareImage given as the parameter. */}
            </uploadImage>
            : assetArea === 'media' && (
            <>
              <input type='text'
              placeholder="please input a video link" 
              value={videoLink} onChange={(e) => setVideoLink(e.target.value)}
              />

              {videoLink && (<ReactPlayer 
              width={'100%'}
            url={videoLink}/> 
            )}
            </>
            )}
                
                </Editor> 
           
            </SharedContent>
            <ShareCreation>
                <AttachAssets>
                    <AssetButton onClick={() => switchAssetArea('image')}>
                        <img src="/images/image.png" alt="" />  {/**alternative text. It's used within <img> tags to provide a textual description of image */}
                    </AssetButton>

                    <AssetButton onClick={() => switchAssetArea('media')}>
                        <img src="/images/video_icon.png" alt="" />
                    </AssetButton>
                </AttachAssets>

                    <ShareComment>
                <AssetButton>
                        <img src="/images/comment_icon.png" alt="" />
                        Anyone
                    </AssetButton>
                    </ShareComment>

                    <PostButton disabled={!editorText ? true : false}
                    onClick={(event) =>  postArticle(event) }
                    >
                        Post
                    </PostButton>
            </ShareCreation>
        </Content>
        </Container>
        }
        </>
    );
};

const Container = styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
z-index: 9999;
color: black;
background-color: rgba(0,0,0,0.8);
animation: fadeIn 0.3s;
`;

const Content = styled.div`
width: 100%;
max-width: 552px;
background-color: white;
max-height: 90%;
overflow: initial;
border-radius: 5px;
position: relative;
display: flex;
flex-direction: column;
top: 32px;
margin: 0 auto;
`;

const Header = styled.div`
display: block;
padding: 16px 20px;
border-bottom: 1px solid rgba(0,0,0,0.15);
font-size: 16px;
line-height: 1.5;
color: rgba(0,0,0,0.6);
font-weight: 400;
display: flex;
justify-content: space-between;
align-items: center;
button{
    height: 40px;
    width: 40px;
    min-height: auto;
    color: rgba(0,0,0,0.15);
    /* img{
        height: 100%;
        object-fit: cover;
    } */
    png, img{
        pointer-events: none;
    }

}
`;

const SharedContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    vertical-align: baseline;
    background: transparent;
    padding: 8px 12px;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 24px;
    png, img{
        width: 40px;
        height: 40px;
        background-clip: content-box;
        border: 2px solid transparent;
        border-radius: 50%;
    }
    span{
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-left: 5px;
    }
`;

const ShareCreation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
display: flex;
align-items: center;
height: 40px;
min-width: auto;
color: rgba(0,0,0,0.5);
`;

const AttachAssets = styled.div`
align-items: center;
display: flex;
padding-right: 8px;
${AssetButton}{
    width: 40px;
}
`;

const ShareComment = styled.div`
padding-left: 8px;
margin-right: auto;
border-left: 1px solid rgba(0,0,0,0.15);
${AssetButton}{
    png{
        margin-right: 5px;
    }
}
`;

const PostButton = styled.button`
min-width: 60px;
border-radius: 20px;
padding-left: 16px;
padding-right: 16px;
background: ${(props) => (props.disabled ? 'rgba(0,0,0,0.8)' : '#0a66c2')};
color: ${(props) => (props.disabled ? 'rgba(1,1,1,0.2)' : 'white')};
&:hover{
    background: ${(props) => (props.disabled ? 'rgba(0,0,0,0.08)' : '#004182')}
}
`;

const Editor = styled.div`
padding: 12px 24px;
text-area{
    width: 100%;
    min-height: 100px;
    resize: none;
}
input{
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
}
`;

const uploadImage = styled.div`
text-align: center;
img{
    width: 100%;
}
`;

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
};

const mapDispatchToProps = (dispatch) => ({
    postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);


