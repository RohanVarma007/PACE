import {useState} from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    }
  });
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/login", data);
      if (response.status === 200) {
        console.log("Login successful");
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("id", response.data.id);
        navigate("/userdata");

      }
    } catch (err) {
      console.error("Login failed:", err);
      setLoginError("Invalid username or password");
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} placeholder="Username" />
      <input {...register("password")} placeholder="Password" />
      <button type="submit">Login</button>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
    </form>
  );
}