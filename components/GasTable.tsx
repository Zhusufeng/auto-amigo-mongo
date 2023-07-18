import { Table} from "antd";
import { Log } from "../lib/types";

type Props = {
  tableData: Log[];
}

const GasTable = (props: Props) => {
  const { tableData } = props;

  const columns = [
    {
      title: "Previous Mileage",
      dataIndex: "previousMileage",
      key: "previousMileage",
    },
    {
      title: "Current Mileage",
      dataIndex: "currentMileage",
      key: "currentMileage",
    },
    {
      title: "Gallons",
      dataIndex: "gallons",
      key: "gallons",
    },
    {
      title: "Price Per Gallon",
      dataIndex: "pricePerGallon",
      key: "pricePerGallon",
    },
  ]
  if (!tableData) return null;
  return (
    <Table 
      columns={columns} 
      dataSource={tableData} 
      pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ["5", "10"]}}
      rowKey="_id" 
    />
  )
}

export default GasTable;