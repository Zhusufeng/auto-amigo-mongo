import { Button, Layout } from "antd";
import { useState } from "react";
import InfoModal from "./InfoModal";

const Header = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  return (
    <>
      <InfoModal
        isModalOpen={isInfoModalOpen}
        setModalStatus={setIsInfoModalOpen}
      />
      <Layout.Header style={{ color: "#ffffff", fontWeight: "bold" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>Auto Amigo Mongo</div>
          <div>
            <Button onClick={() => setIsInfoModalOpen(true)}>
              Instructions
            </Button>
          </div>
        </div>
      </Layout.Header>
    </>
  );
};

export default Header;
