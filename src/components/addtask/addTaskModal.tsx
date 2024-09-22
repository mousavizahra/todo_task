 import { Modal, Input, Button, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store/index';
import { closeModal } from '../../redux/reducers/modalSlice';
import {
  CalendarOutlined,
  FlagOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

const TaskModal: React.FC = () => {
  const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);
  const dispatch = useDispatch();

  const handleOk = () => {
    dispatch(closeModal());
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <Modal title="Add Task" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Input placeholder="Task Name" style={{ marginBottom: 16 }} />
      <Space direction="horizontal" size="small">
        <Button>
          <CalendarOutlined /> Due date
        </Button>
        <Button>
          <FlagOutlined /> Priority
        </Button>
        <Button>
          <ClockCircleOutlined /> Reminders
        </Button>
      </Space>
    </Modal>
  );
};

export default TaskModal;
