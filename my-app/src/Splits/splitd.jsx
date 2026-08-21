import { useForm, useFieldArray } from "react-hook-form";

function RunForm() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      runName: "",
      splits: [{ distance: "", time: "" }]
    }
  });

  const { fields: splitFields, append: appendSplit, remove: removeSplit } = useFieldArray({
    control,
    name: "splits"
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/runs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("Failed to save run");
      }

      const savedRun = await response.json();
      console.log("Saved:", savedRun);
    } catch (err) {
      console.error("Error saving run:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("runName")} placeholder="Run name" />

      {splitFields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`splits.${index}.distance`)} placeholder="Distance" />
          <input {...register(`splits.${index}.time`)} placeholder="Time" />
          <button type="button" onClick={() => removeSplit(index)}>Remove</button>
        </div>
      ))}

      <button type="button" onClick={() => appendSplit({ distance: "", time: "" })}>
        Add Split
      </button>

      <button type="submit">Submit</button>
    </form>
  );
}

export default RunForm;
