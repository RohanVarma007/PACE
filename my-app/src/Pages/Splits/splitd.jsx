import { useForm, useFieldArray } from "react-hook-form";
import { useState } from 'react';

function RunForm() {
  const [isEditing, setIsEditing] = useState(true);
  const [existingRunId, setExistingRunId] = useState(null); 

  const { register, control, handleSubmit } = useForm({
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

  const onSubmit = async (data) => {
    const payload = { ...data, userId: localStorage.getItem("id") };

    try {
      const url = existingRunId
        ? `http://localhost:5000/runs/${existingRunId}`
        : "http://localhost:5000/run";
      const method = existingRunId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Failed to save run");

      const savedRun = await response.json();
      console.log("Saved:", savedRun);

      if (!existingRunId) {
        setExistingRunId(savedRun._id);
      }

      setIsEditing(false);
    } catch (err) {
      console.error("Error saving run:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("runName")} placeholder="Run name" disabled={!isEditing} />
      <input {...register("totalDistance")} placeholder="Total distance" disabled={!isEditing} />
      <input {...register("runDuration")} placeholder="Run duration" disabled={!isEditing} />

      {splitFields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`splits.${index}.distance`)} placeholder="Distance" disabled={!isEditing} />
          <input {...register(`splits.${index}.time`)} placeholder="Time" disabled={!isEditing} />
          {isEditing && (
            <button type="button" onClick={() => removeSplit(index)}>
              Remove split
            </button>
          )}
        </div>
      ))}

      {isEditing && (
        <button type="button" onClick={() => appendSplit({ distance: '', time: '' })}>
          Add split
        </button>
      )}

      {isEditing ? (
  <button type="submit">
    {existingRunId ? "Save" : "Submit"}
  </button>
) : (
  <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      console.log("edit clicked");
      setIsEditing(true);
    }}
  >
    Edit
  </button>
)}
    </form>
  );
}

export default RunForm;