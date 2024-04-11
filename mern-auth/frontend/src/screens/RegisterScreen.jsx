import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import initial from "../assets/dummyImage.png";
import {
  isEmailValid,
  isPasswordValid,
  nameValidate,
} from "../utilities/validationForm";
import { Form, Button, Row, Col } from "react-bootstrap"; // Import Form components from react-bootstrap
import FormContainer from "../components/FormContainer";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(initial);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const cpasswordRef = useRef(null);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleImageUpload = (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      if (
        isEmailValid(email, setEmail, emailRef) &&
        nameValidate(name, setName, usernameRef) &&
        isPasswordValid(password, setPassword, passwordRef) &&
        isPasswordValid(confirmPassword, setConfirmPassword, cpasswordRef)
      ) {
        try {
          const formData = new FormData();
          formData.append("name", name);
          formData.append("email", email);
          formData.append("password", password);
          formData.append("image", imageFile);

          const res = await register(formData).unwrap();
          dispatch(setCredentials({ ...res }));
          toast.success("Registration Successful");
          navigate("/");
        } catch (err) {
          if (
            err?.data?.message ===
            "Cannot read properties of undefined (reading 'filename')"
          ) {
            toast.error("Please add an image");
          } else {
            toast.error(err?.data?.message || err.error);
          }
        }
      }
    }
  };

  return (
<FormContainer>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              nameValidate(e.target.value, setName, usernameRef);
            }}
          />
          <div style={{ color: "#e3342f", marginTop: "8px" }}>
            <span ref={usernameRef}></span>
          </div>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              isEmailValid(e.target.value, setEmail, emailRef);
            }}
          />
          <div style={{ color: "#e3342f", marginTop: "8px" }}>
            <span ref={emailRef}></span>
          </div>
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              style={{ marginTop: "10px", maxWidth: "200px" }}
            />
          )}
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              isPasswordValid(e.target.value, setPassword, passwordRef);
            }}
          />
          <div style={{ color: "#e3342f", marginTop: "8px" }}>
            <span ref={passwordRef}></span>
          </div>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              isPasswordValid(e.target.value, setConfirmPassword, cpasswordRef);
            }}
          />
          <div style={{ color: "#e3342f", marginTop: "8px" }}>
            <span ref={cpasswordRef}></span>
          </div>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Register
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          Already have an account? <Link to={`/login`}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
