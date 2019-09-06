import React, { Component } from "react";
import { isAuthenticated } from "../../Components/Auth";
import { create } from "./apiPost";
import { Redirect } from "react-router-dom";
//import {defaultPostImage} from '../../../default_img_post.png';

// ui components
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import Label from '../../Components/Label';
import H2 from '../../Components/Label';
import SuccessMessage from '../User/SuccessMessage';
import ErrorMessage from '../User/ErrorMessage';


class CreatePost extends Component {

    state = {
            title: "",
            body: "",
            photo: "",
            error: "",
            user: {},
            fileSize: 0,
            loading: false,
            redirectToProfile: false,
            error: {},
            success: ""
    };

    componentDidMount() {
        this.postData = new FormData();
        this.setState({ user: isAuthenticated().user });
    }

    isValid = () => {
        const { title, body, fileSize } = this.state;
        if (fileSize > 100000) {
            this.setState({
                error: "File size should be less than 100kb",
                loading: false
            });
            return false;
        }
        if (title.length === 0 || body.length === 0) {
            this.setState({ 
                error:{
                    show: true,
                    Error: "All fields are required"
                }, 
            loading: false });
            return false;
        }
        return true;
    };

    updateField = (e) => {
        this.setState({ error: "" });
        const value = e.target.name === "photo" ? e.target.files[0] : e.target.value;
        const fileSize = e.target.name === "photo" ? e.target.files[0].size : 0;
        this.postData.set(e.target.name, value);
        this.setState({[e.target.name] : value, fileSize });
    };
      

    submitField = e => {

        e.preventDefault();
    
        const userId = isAuthenticated().user._id;
    
        const token = isAuthenticated().token;
    
        if(this.isValid()){
          create(userId, token, this.postData)
          .then(data => console.log("New Post Data", data));
        }
    };    

    newPostForm = (error, success, loading, title, body) => (
        
        <div className="container">

      <H2 title="Edit Profile" />

      <ErrorMessage error={error} />

      <SuccessMessage success={success} />

      <form onSubmit={this.submitField}>

        <div className="form-group">

        <Label name="photo-profile" title="Photo Profile" />
        <Input
            type="file"
            id="photo-profile"
            name="photo"
            change={this.updateField}
          />
        </div>

        <div className="form-group">

          <Label name="title" title="Title" />

          <Input
            type="text"
            id="title"
            value={title}
            placeholder="Enter your title"
            name="title"
            change={this.updateField}
          />

        </div>

        <div className="form-group">

          <Label name="body" title="Body" />

          <Input
            type="text"
            id="body"
            value={body}
            placeholder="Enter your body"
            name="body"
            change={this.updateField}
          />

        </div>

        

        
        <Button title={loading ? "Loading..." : "Create Post"}
          disabled={loading ? true : false} />

      </form>

    </div>

    );

    render() {
        const {
            title,
            body,
            photo,
            user,
            loading,
            redirectToProfile,
            error,
            success
        } = this.state;

        /*if (redirectToProfile) {
            return <Redirect to={`/user/${user._id}`} />;
        }*/

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Create a new post</h2>

                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    ""
                )}

                {this.newPostForm(error, success, loading, title, body)}
            </div>
        );
    }
}

export default CreatePost;
