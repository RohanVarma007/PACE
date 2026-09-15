import { useState } from 'react';
import { useParams } from 'react-router-dom';
import RunForm from './splitd.jsx';
import API from '../../api.jsx';
function Coach() {
  const { runId } = useParams();
  const [coachResponse, setCoachResponse] = useState(null);
  const [fetchingCoach, setFetchingCoach] = useState(false);
  const [error, setError] = useState(null);
  const [runData, setRunData] = useState(null);
  const [showAICoach, setShowAICoach] = useState(true);

  // Callback when RunForm loads data
  const handleRunDataLoaded = (data) => {
    setRunData(data);
  };

  const handleAICoach = async () => {
    if (!runData || !runData.splits) {
      setError('No split data available');
      return;
    }

    try {
      setFetchingCoach(true);
      setError(null);

      const response = await API.post("/coach", {
        splits: runData.splits,
        runData: runData,
        runId: runId,
        userId: localStorage.getItem("id"),
      });

      setCoachResponse(response.data.suggestions);
      setShowAICoach(false);
    } catch (err) {
    console.log("BACKEND ERROR:", err.response?.data);
    setError(err.response?.data?.error || err.message);
}
    finally {
      setFetchingCoach(false);
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 60px)',
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{ width: '100%', maxWidth: '900px' }}>
        {/* RunForm Component + AI Coach Button Container */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '32px'
        }}>
          {/* RunForm */}
          <RunForm runIdProp={runId} onDataLoaded={handleRunDataLoaded} />

          {/* AI Coach Button - Directly below RunForm with minimal gap */}
          {runData && showAICoach && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              paddingTop: '16px',
              paddingBottom: '0'
            }}>
              <button
                onClick={handleAICoach}
                disabled={fetchingCoach}
                style={{
                  padding: '10px 28px',
                  backgroundColor: fetchingCoach ? 'rgba(0, 217, 146, 0.5)' : 'var(--primary)',
                  color: fetchingCoach ? 'rgba(0, 0, 0, 0.5)' : 'var(--on-primary)',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: fetchingCoach ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  opacity: fetchingCoach ? 0.7 : 1,
                  transform: 'scale(1)',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  if (!fetchingCoach) {
                    e.currentTarget.style.backgroundColor = 'var(--primary-soft)';
                    e.currentTarget.style.transform = 'scale(1.4)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 217, 146, 0.25)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!fetchingCoach) {
                    e.currentTarget.style.backgroundColor = 'var(--primary)';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {fetchingCoach ? 'Getting Advice...' : '🤖 AI COACH'}
              </button>
            </div>
          )}
        </div>

        {/* Coach Response Box */}
        {coachResponse && (
          <div style={{
            backgroundColor: 'var(--canvas-soft)',
            border: '1px solid var(--primary)',
            borderRadius: 'var(--radius-md)',
            padding: '32px',
            marginBottom: '32px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '16px',
              gap: '8px'
            }}>
              <span style={{ fontSize: '24px' }}>🤖</span>
              <h2 style={{
                fontSize: '20px',
                fontWeight: 700,
                color: 'var(--primary)',
                margin: 0
              }}>
                Coach Advice
              </h2>
            </div>

            <div style={{
              height: '2px',
              backgroundColor: 'var(--primary)',
              opacity: 0.3,
              marginBottom: '16px'
            }} />

            <div style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: 'var(--ink)',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              marginBottom: '20px'
            }}>
              {typeof coachResponse === 'string'
                ? coachResponse
                : coachResponse.message || coachResponse.advice || coachResponse.suggestions || JSON.stringify(coachResponse, null, 2)}
            </div>

            {/* Button to ask again */}
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center'
            }}>
              <button
                onClick={() => {
                  setCoachResponse(null);
                  setShowAICoach(true);
                }}
                style={{
                  padding: '8px 20px',
                  backgroundColor: 'var(--primary)',
                  color: 'var(--on-primary)',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  transform: 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary-soft)';
                  e.currentTarget.style.transform = 'scale(1.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Ask Again
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            color: 'var(--danger)',
            marginTop: '16px'
          }}>
            <p style={{ margin: 0, fontWeight: 500 }}>Error: {error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Coach;
