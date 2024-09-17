import { useState } from 'react';
import { Button, Modal, Input, Flex } from 'antd';
import {
    CalendarOutlined,
    FlagOutlined,
    ClockCircleOutlined
  }  from '@ant-design/icons';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
         <Input placeholder='Task Name'/>
         <Flex gap='small'>
            <Button> <CalendarOutlined /> Due date</Button>
            <Button> <FlagOutlined /> Priority</Button>
            <Button> <ClockCircleOutlined /> Reminders</Button>
         </Flex>
      </Modal>
    </>
  );
};

export default App;