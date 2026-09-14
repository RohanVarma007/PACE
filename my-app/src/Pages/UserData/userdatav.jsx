import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UserDatav() {
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();
    const { runId } = useParams();

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch("http://localhost:5000/userdata", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: localStorage.getItem("id")
                })
            });
            const data = await response.json();
            // Sort by most recent first (descending by createdAt)
            const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setUserData(sortedData);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleRunClick = (runId) => {
        navigate(`/runform/${runId}`);
    };

    const username = localStorage.getItem("username") || "Runner";

    return (
        <div style={{
            minHeight: 'calc(100vh - 60px)',
            padding: '40px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <div style={{ width: '100%', maxWidth: '1000px' }}>
                {/* Header with Log Run button */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '32px'
                }}>
                    <h1 className="text-display-md" style={{
                        fontSize: '48px',
                        fontWeight: 700,
                        color: 'var(--ink-strong)',
                        margin: 0
                    }}>
                        Hey, {username}
                    </h1>
                    <button
                        onClick={() => navigate('/runform')}
                        style={{
                            padding: '10px 24px',
                            backgroundColor: 'var(--primary)',
                            color: 'var(--on-primary)',
                            border: 'none',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '13px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            transform: 'scale(1)',
                            whiteSpace: 'nowrap'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--primary-soft)';
                            e.currentTarget.style.transform = 'scale(1.4)';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 217, 146, 0.25)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--primary)';
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        + Log Run
                    </button>
                </div>
                <p className="text-body" style={{
                    marginBottom: '32px',
                    textAlign: 'center',
                    color: 'var(--body)',
                    fontSize: '15px'
                }}>
                    Here are your logged runs.
                </p>

                {/* Run list */}
                {userData.length === 0 ? (
                    <div
                        className="card"
                        style={{
                            borderStyle: 'dashed',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '60px 40px',
                            textAlign: 'center',
                            margin: '0 auto'
                        }}
                    >
                        <p style={{ fontSize: '50px', marginBottom: '16px' }}>🏃</p>
                        <p className="text-body" style={{ marginBottom: '8px', fontSize: '18px', fontWeight: 600, color: 'var(--ink)' }}>
                            No runs yet.
                        </p>
                        <p className="text-muted">Head to the run form to log your first one.</p>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '24px',
                        alignContent: 'start'
                    }}>
                        {userData.map((data) => (
                            <div
                                key={data._id}
                                className="card"
                                onClick={() => handleRunClick(data._id)}
                                style={{
                                    cursor: 'pointer',
                                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                    padding: '24px',
                                    borderColor: 'var(--hairline)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '16px',
                                    transformOrigin: 'center',
                                    transform: 'scale(1)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--primary)';
                                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 217, 146, 0.1)';
                                    e.currentTarget.style.transform = 'scale(1.03)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--hairline)';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            >
                                {/* Run name */}
                                <h2
                                    style={{
                                        fontSize: '20px',
                                        fontWeight: 700,
                                        color: 'var(--ink-strong)',
                                        margin: 0
                                    }}
                                >
                                    {data.runName}
                                </h2>

                                {/* Green divider */}
                                <div style={{
                                    height: '2px',
                                    backgroundColor: 'var(--primary)',
                                    opacity: 0.4,
                                    margin: '4px 0'
                                }} />

                                {/* Stats grid */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '16px'
                                }}>
                                    <div>
                                        <p style={{
                                            fontSize: '11px',
                                            fontWeight: 600,
                                            color: 'var(--mute)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            marginBottom: '6px'
                                        }}>
                                            Distance
                                        </p>
                                        <p style={{
                                            color: 'var(--primary)',
                                            fontWeight: 600,
                                            fontSize: '16px'
                                        }}>
                                            {data.totalDistance || data.splits?.[0]?.distance || '—'}
                                        </p>
                                    </div>

                                    <div>
                                        <p style={{
                                            fontSize: '11px',
                                            fontWeight: 600,
                                            color: 'var(--mute)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            marginBottom: '6px'
                                        }}>
                                            Duration
                                        </p>
                                        <p style={{
                                            color: 'var(--primary)',
                                            fontWeight: 600,
                                            fontSize: '16px'
                                        }}>
                                            {data.runDuration || data.splits?.[0]?.time || '—'}
                                        </p>
                                    </div>

                                    <div>
                                        <p style={{
                                            fontSize: '11px',
                                            fontWeight: 600,
                                            color: 'var(--mute)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            marginBottom: '6px'
                                        }}>
                                            Splits
                                        </p>
                                        <p style={{
                                            color: 'var(--ink)',
                                            fontWeight: 600,
                                            fontSize: '16px'
                                        }}>
                                            {data.splits?.length || 0}
                                        </p>
                                    </div>

                                    <div>
                                        <p style={{
                                            fontSize: '11px',
                                            fontWeight: 600,
                                            color: 'var(--mute)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            marginBottom: '6px'
                                        }}>
                                            Date Logged
                                        </p>
                                        <p style={{
                                            color: 'var(--ink)',
                                            fontWeight: 600,
                                            fontSize: '16px'
                                        }}>
                                            {new Date(data.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserDatav;
