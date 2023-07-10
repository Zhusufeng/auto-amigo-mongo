import { useState } from "react";
import { mutate } from "swr";

type Props = {
  userForm: {
    firstName: string;
    lastName: string;
    email: string;
  };
};

const Form = ({ userForm }: Props) => {
  const contentType = "application/json";
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    firstName: userForm.firstName,
    lastName: userForm.lastName,
    email: userForm.email,
  });

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }
      mutate("/api/user");
    } catch (error) {
      setMessage("Failed to add user");
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
      <form id="add-user-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">firstName</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">lastName</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
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
