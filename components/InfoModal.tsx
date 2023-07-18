import { Button, Modal } from "antd";
import { MAX_USERS, MAX_GAS_ENTRIES } from "../lib/constants";

type Props = {
  isModalOpen: boolean;
  setModalStatus: (status: boolean) => void;
};

const InfoModal = ({ isModalOpen, setModalStatus }: Props) => {
  const handleOk = () => {
    setModalStatus(false);
  }

  return (
    <Modal 
      open={isModalOpen}
      footer={[
        <Button type="primary" key="ok" onClick={handleOk}>
          OK
        </Button>
      ]}
    >
      <div>
        <h1>Background</h1>
        <p>
          This is a mini version of Auto Amigo. 
          I made this to brush up on MongoDB, use Next.js&apos; pages API (serverless), 
          and deploy on Vercel. 
          It mimics Auto Amigo in the way that there can be multiple users, and their gas usage
          and spending can be saved to the web app.
        </p>
        <h1>Instructions</h1>
        <p>
          Since this is a mini version, only {MAX_USERS} users can be created.
          Each user can only have up to {MAX_GAS_ENTRIES} gas log entries. 
          Everyone can view the users&apos; gas logs.
          If there are no users, create a user.
          Created users will show under &quot;Users&quot;. 
          Select a user to view their gas log or to add to their gas log.
        </p>
      </div>
    </Modal>
  )
};

export default InfoModal;