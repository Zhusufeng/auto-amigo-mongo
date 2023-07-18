import { Tag, Tooltip } from "antd";
import { User } from "../lib/types";

type Props = {
  user: User;
  users: {
    data: User[];
  };
  userHandleClick: (u: User) => void;
}

const UsersList = ({ user, users, userHandleClick }: Props) => {
  return (
    <div>
      {users?.data.map((u: User) => {
        const userString = `${u.firstName} ${u.lastName}`
        return (
          <Tooltip 
            key={u._id as string} 
            title={u.email}
          >
            <Tag 
              color={user._id === u._id ? "blue" : "lightgray"}
              onClick={() => userHandleClick(u)}
            >
              {userString}
            </Tag>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default UsersList;
