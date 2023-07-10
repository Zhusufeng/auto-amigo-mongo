import { useState } from "react";
import { mutate } from "swr";

type Props = {
  gasForm: {
    previousMileage: string;
    currentMileage: string;
    gallons: string;
    pricePerGallon: string;
  };
  userId: string;
};

const Form = ({ gasForm, userId }: Props) => {
  const contentType = "application/json";
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    previousMileage: gasForm.previousMileage,
    currentMileage: gasForm.currentMileage,
    gallons: gasForm.gallons,
    pricePerGallon: gasForm.pricePerGallon,
  });

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form: {
    previousMileage: string;
    currentMileage: string;
    gallons: string;
    pricePerGallon: string;
  }) => {
    try {
      const { previousMileage, currentMileage, gallons, pricePerGallon } = form;
      const data = {
        previousMileage: parseInt(previousMileage, 10),
        currentMileage: parseInt(currentMileage, 10),
        gallons: parseInt(gallons, 10),
        pricePerGallon: parseInt(pricePerGallon, 10),
      };
      console.log("data", data);
      const url = `/api/gas/${userId}`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(data),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }
      mutate("/api/gas");
    } catch (error) {
      setMessage("Failed to add gas");
    }
  };

  const handleChange = (e: { target: any }) => {
    const target = e.target;
    const { value, name } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    postData(form);
  };

  return (
    <>
      <form id="add-gas-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="previousMileage">previousMileage</label>
          <input
            type="text"
            name="previousMileage"
            value={form.previousMileage}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="currentMileage">currentMileage</label>
          <input
            type="text"
            name="currentMileage"
            value={form.currentMileage}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="gallons">gallons</label>
          <input
            type="text"
            name="gallons"
            value={form.gallons}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="pricePerGallon">pricePerGallon</label>
          <input
            type="number"
            name="pricePerGallon"
            value={form.pricePerGallon}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
    </>
  );
};

export default Form;
