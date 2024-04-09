import { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { BASE_URL } from "../utilities/baseUrl";
import Loader from "../components/Loader";
import {
  isEmailValid,
  isPasswordValid,
  nameValidate,
} from "../utilities/validationForm";

function UpdateScreen() {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageFile, setImageFile] = useState();
  const [imageUrl, setImageUrl] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const cpasswordRef = useRef(null);

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    if (file) {
      setImageFile(file);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setUsername(userInfo.name);
    setEmail(userInfo.email);
    setImageUrl(`${BASE_URL}static/userImages/${userInfo.image}`);
  }, [userInfo]);

  const handleChangeName = (e) => {
    const NameValue = e.target.value;
    nameValidate(NameValue, setUsername, usernameRef);
  };
  const handleChangeEmail = (e) => {
    const emailValue = e.target.value;
    isEmailValid(emailValue, setEmail, emailRef);
  };
  const handleChangePassword = (e) => {
    const passwordValue = e.target.value;
    isPasswordValid(passwordValue, setPassword, passwordRef);
  };
  const handleChangeCPassword = (e) => {
    const passwordValue = e.target.value;
    isPasswordValid(passwordValue, setConfirmPassword, cpasswordRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not Match");
    } else {
      try {
        const formData = new FormData();
        formData.append("_id", userInfo._id);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", imageFile);

        const res = await updateUser(formData).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile Updated");
        navigate("/profile");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <div className="container">
        <h1>Update Profile</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="image">
            <Form.Label style={{ display: "none" }}>Profile Picture</Form.Label>
            <Form.Control
              style={{ display: "none" }}
              id="image-file"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imageUrl && (
              <label htmlFor="image-file">
                <img
                  src={imageUrl}
                  alt="Preview"
                  style={{ marginTop: "10px", maxWidth: "200px" }} // Added styling for image preview
                />
              </label>
            )}
          </Form.Group>

          <Form.Group className="my-2" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={handleChangeName}
            />
          </Form.Group>
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleChangeEmail}
            />
          </Form.Group>
          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={handleChangePassword}
            />
          </Form.Group>

          <Form.Group className="my-2" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={handleChangeCPassword}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Update
          </Button>

          {isLoading && <Loader />}
        </Form>
      </div>
    </>
  );
}

export default UpdateScreen;
