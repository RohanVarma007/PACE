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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'linear-gradient(135deg, rgba(0, 217, 146, 0.05) 0%, rgba(0, 217, 146, 0.02) 100%)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px'
      }}>
        {/* Logo */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 800,
            color: 'var(--primary)',
            margin: '0 0 8px 0',
            letterSpacing: '-1px',
            textTransform: 'uppercase',
            fontStyle: 'italic'
          }}>
            PACE
          </h1>
          <p style={{
            color: 'var(--body)',
            fontSize: '14px',
            margin: 0
          }}>
            Running tracker for runners
          </p>
        </div>

        {/* Card */}
        <div className="card" style={{
          padding: '40px 32px'
        }}>
          <p className="text-eyebrow" style={{ textAlign: 'center', marginBottom: '8px' }}>Welcome Back</p>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 700,
            color: 'var(--ink-strong)',
            textAlign: 'center',
            margin: '0 0 32px 0'
          }}>
            Log in
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <label style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--mute)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }} htmlFor="username">
                Username
              </label>
              <input id="username" {...register("username")} placeholder="Enter your username" style={{
                padding: '12px 16px',
                fontSize: '14px',
                border: '1px solid var(--hairline)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--canvas-soft)',
                color: 'var(--ink)',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--primary)';
                e.target.style.boxShadow = '0 0 12px rgba(0, 217, 146, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--hairline)';
                e.target.style.boxShadow = 'none';
              }}
              />
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <label style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--mute)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }} htmlFor="password">
                Password
              </label>
              <input id="password" type="password" {...register("password")} placeholder="Enter your password" style={{
                padding: '12px 16px',
                fontSize: '14px',
                border: '1px solid var(--hairline)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--canvas-soft)',
                color: 'var(--ink)',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--primary)';
                e.target.style.boxShadow = '0 0 12px rgba(0, 217, 146, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--hairline)';
                e.target.style.boxShadow = 'none';
              }}
              />
            </div>

            {loginError && (
              <p style={{
                fontSize: '13px',
                color: 'var(--danger)',
                margin: '8px 0 0 0',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                borderLeft: '3px solid var(--danger)'
              }}>
                {loginError}
              </p>
            )}

            <button type="submit" style={{
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: 600,
              backgroundColor: 'var(--primary)',
              color: 'var(--on-primary)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginTop: '8px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#2fd6a1';
              e.target.style.boxShadow = '0 0 20px rgba(0, 217, 146, 0.2)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'var(--primary)';
              e.target.style.boxShadow = 'none';
              e.target.style.transform = 'translateY(0)';
            }}
            >
              Log In
            </button>
          </form>

          <p style={{
            textAlign: 'center',
            marginTop: '24px',
            color: 'var(--body)',
            fontSize: '13px'
          }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{
              fontWeight: 600,
              color: 'var(--primary)',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#2fd6a1'}
            onMouseLeave={(e) => e.target.style.color = 'var(--primary)'}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
