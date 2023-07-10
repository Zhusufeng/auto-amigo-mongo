import { Table} from 'antd';

type Log = {
  _id: string;
  previousMileage: number;
  currentMileage: number;
  gallons: number;
  pricePerGallon: number;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  tableData: Log[];
}

const GasTable = (props: Props) => {
  const { tableData } = props;

  const columns = [
    {
      title: 'Previous Mileage',
      dataIndex: 'previousMileage',
      key: 'previousMileage',
    },
    {
      title: 'Current Mileage',
      dataIndex: 'currentMileage',
      key: 'currentMileage',
    },
    {
      title: 'Gallons',
      dataIndex: 'gallons',
      key: 'gallons',
    },
    {
      title: 'Price Per Gallon',
      dataIndex: 'pricePerGallon',
      key: 'pricePerGallon',
    },
  ]
  if (!tableData) return null;
  return (
    <Table columns={columns} dataSource={tableData} rowKey='_id' />
  )
}

export default GasTable;