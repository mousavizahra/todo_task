import  { useState } from 'react';
import { Button, Input, Modal,Typography,List} from 'antd';
import { 
    SearchOutlined,
    HomeOutlined,
    InboxOutlined,
    CalendarOutlined, 
    AppstoreOutlined,
    ClockCircleOutlined
  } from '@ant-design/icons';
  


const { Text, Title } = Typography;

interface NavigationItem {
    title:string;
    shortcut:string;
    icon:React.ReactNode;
}

interface RecentlyViewedItem {
    title: string;
    icon: React.ReactNode;
  }

const searchModal: React.FC = () => {

   const recentlyViewed: RecentlyViewedItem[] = [
    { title: 'Today', icon: <CalendarOutlined /> },
    { title: 'Inbox', icon: <InboxOutlined /> },
    { title: 'Upcoming', icon: <ClockCircleOutlined /> }
  ];
    const navigationItems: NavigationItem[] = [
        { title: 'Go to home', shortcut: 'G then H' ,icon:<HomeOutlined />},
        { title: 'Go to inbox', shortcut: 'G then I',icon:<InboxOutlined /> },
        { title: 'Go to today', shortcut: 'G then T', icon:<CalendarOutlined /> },
        { title: 'Go to filter & labels', shortcut: 'G then V',icon:<AppstoreOutlined /> },
      ];

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
      <Modal  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
         <Input 
         placeholder='Search or type a command'
         prefix={<SearchOutlined />}
         suffix={<Text>Ctrl K</Text>}
         style={{ marginBottom: '10px'}}
       />  

         <div>
            <Title level={5}>Recently viewed</Title>
            <List 
            dataSource={recentlyViewed}
            renderItem={(item)=>(
                <List.Item>
                    <span>{item.icon}</span>
                    <Text style={{ marginLeft: '10px' }}>{item.title}</Text>
              </List.Item>
            )}/>
         </div>
         <div>
            <Title level={5}>Navigation</Title>
            <List
            dataSource={navigationItems}
            renderItem={(item)=>(
                <List.Item>
                    <span>{item.icon}</span>
                    <Text style={{ marginLeft: '10px' }}>{item.title}</Text>
              <Text type="secondary" style={{ marginLeft: 'auto' }}>
                {item.shortcut} </Text>
                </List.Item>
            )}/>
         </div>
      </Modal>
    </>
  );
};

export default  searchModal;