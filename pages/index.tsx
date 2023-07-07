import axios from "axios";
import useSWR from "swr";
import Form from "../components/Form";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

type Log = {
  _id: String;
  previousMileage: Number;
  currentMileage: Number;
  gallons: Number;
  pricePerGallon: Number;
  createdAt: String;
  updatedAt: String;
};

const Table = () => {
  const gasForm = {
    previousMileage: "",
    currentMileage: "",
    gallons: "",
    pricePerGallon: "",
  };

  const { data, error } = useSWR("/api/gas", fetcher);
  console.log("data", data);

  return (
    <div>
      <h1>Auto Amigo Mongo</h1>
      <h2>Add New Gas Entry</h2>
      <Form gasForm={gasForm} />
      <h2>Gas History</h2>
      <table>
        <thead>
          <tr>
            <td>Previous Mileage</td>
            <td>Current Mileage</td>
            <td>Gallons</td>
            <td>Price Per Gallon</td>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((log: Log) => {
            return (
              <tr key={log._id as any}>
                <td>{log.previousMileage.toString()}</td>
                <td>{log.currentMileage.toString()}</td>
                <td>{log.gallons.toString()}</td>
                <td>{log.pricePerGallon.toString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>{" "}
    </div>
  );
};

export default Table;
