import { Button, Modal } from "antd";
import { MAX_USERS, MAX_GAS_ENTRIES } from "../lib/constants";

type Props = {
  isModalOpen: boolean;
  setModalStatus: (status: boolean) => void;
};

const InfoModal = ({ isModalOpen, setModalStatus }: Props) => {
  const handleOk = () => {
    setModalStatus(false);
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleOk}
      footer={[
        <Button type="primary" key="ok" onClick={handleOk}>
          OK
        </Button>,
      ]}
    >
      <div>
        <h1>Instructions</h1>
        <p>
          This is a mini version of my Auto Amigo project, so there is limited
          functionality. To learn more, checkout the{" "}
          <a
            href="https://github.com/Zhusufeng/auto-amigo-mongo"
            target="_blank"
            rel="noopener"
          >
            repo
          </a>
          .
        </p>

        <h2>How to Use</h2>
        <ol>
          <li>Created users will show under &quot;Users&quot;.</li>
          <li>
            If there are no users, create a user by clicking the &quot;Create
            User&quot; button and fill out the form.
          </li>
          <li>
            Click on a user to view their gas log. An &quot;Add Gas Entry&quot;
            button will appear that allows you to add to their gas log.
          </li>
        </ol>

        <h2>Limitations</h2>
        <ul>
          <li>Only {MAX_USERS} users can be created.</li>
          <li>
            Each user can only have up to {MAX_GAS_ENTRIES} gas log entries.
          </li>
          <li>Everyone can view the users&apos; gas logs.</li>
        </ul>
      </div>
    </Modal>
  );
};

export default InfoModal;
