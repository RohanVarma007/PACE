import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    }
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/signup", data);
      if (response.status === 200) {
        console.log("Signup successful");
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("id", response.data.id);
        navigate("/userdata");
      }
      
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} placeholder="Username" />
      <input {...register("password")} placeholder="Password" />
      <button type="submit">Sign Up</button>
    </form>
  );
}