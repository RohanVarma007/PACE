import { useForm, useFieldArray } from "react-hook-form";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import API from "../../api.jsx";
function RunForm({ runIdProp, onDataLoaded }) {
  const { runId } = useParams();
  const finalRunId = runIdProp || runId;
  const [isEditing, setIsEditing] = useState(!finalRunId);
  const [existingRunId, setExistingRunId] = useState(finalRunId || null);
  const [loading, setLoading] = useState(!!finalRunId);

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      runName: "",
      totalDistance: "",
      runDuration: "",
      splits: [{ distance: "", time: "" }]
    }
  });

  const { fields: splitFields, append: appendSplit, remove: removeSplit } = useFieldArray({
    control,
    name: "splits"
  });

  useEffect(() => {
    if (finalRunId) {
      fetchRunData();
    }
  }, [finalRunId]);

  const fetchRunData = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/run/${finalRunId}`);
      
      reset({
        runName: response.data.runName,
        totalDistance: response.data.totalDistance,
        runDuration: response.data.runDuration,
        splits: response.data.splits || [{ distance: "", time: "" }]
      });
      setExistingRunId(response.data._id);
      setIsEditing(false);

      if (onDataLoaded) {
        onDataLoaded(response.data);
      }
    } catch (err) {
      console.error('Error fetching run:', err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    const payload = { ...data, userId: localStorage.getItem("id") };

    try {
  const url = existingRunId
    ? `/runs/${existingRunId}`
    : "/run";

  const response = existingRunId
    ? await API.put(url, payload)
    : await API.post(url, payload);


      console.log("Saved:", response);

      if (!existingRunId) {
        setExistingRunId(response.data._id);
      }

      setIsEditing(false);
    } catch (err) {
      console.error("Error saving run:", err);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px 40px',
        color: 'var(--body)'
      }}>
        <p>Loading run details...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '0' }}>
      <div className="card">
        {/* Header */}
        <p className="text-eyebrow mb-2">{isEditing ? 'Log Your Run' : 'Your Run'}</p>
        <h1 className="text-display-md mb-8">{isEditing ? 'New Run' : 'Run Details'}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Run info fields - clean grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-muted text-sm">Run Name</label>
              <input {...register("runName")} placeholder="Morning run" disabled={!isEditing} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-muted text-sm">Total Distance</label>
              <input {...register("totalDistance")} placeholder="5.0 km" disabled={!isEditing} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-muted text-sm">Duration</label>
              <input {...register("runDuration")} placeholder="25:30" disabled={!isEditing} />
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '2px', backgroundColor: 'var(--primary)', opacity: 0.3 }} />

          {/* Splits - consistent from first row */}
          <div>
            <p className="text-eyebrow mb-4">Splits</p>

            <div className="flex flex-col gap-3">
              {splitFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-end gap-3"
                  style={{
                    padding: '12px 16px',
                    border: '1px dashed rgba(79,93,117,0.4)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <span className="text-muted text-sm font-semibold" style={{ minWidth: '24px', paddingBottom: '12px' }}>
                    {index + 1}
                  </span>

                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-muted text-sm">Distance</label>
                    <input {...register(`splits.${index}.distance`)} placeholder="1.0 km" disabled={!isEditing} />
                  </div>

                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-muted text-sm">Time</label>
                    <input {...register(`splits.${index}.time`)} placeholder="5:10" disabled={!isEditing} />
                  </div>

                  {isEditing && (
                    <button
                      type="button"
                      className="btn-danger"
                      style={{ padding: '8px 12px', fontSize: '14px', marginBottom: '0' }}
                      onClick={() => removeSplit(index)}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <button
                type="button"
                className="btn-ghost mt-4 w-full"
                style={{ border: '1px dashed var(--hairline)' }}
                onClick={() => appendSplit({ distance: '', time: '' })}
              >
                + Add split
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-2">
            {isEditing ? (
              <button type="submit" className="btn-primary flex-1">
                {existingRunId ? "Save Changes" : "Submit Run"}
              </button>
            ) : (
              <button
                type="button"
                className="btn-outline flex-1"
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditing(true);
                }}
              >
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default RunForm;
