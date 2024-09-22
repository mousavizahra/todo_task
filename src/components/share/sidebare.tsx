import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { 
  PlusCircleOutlined,
  SearchOutlined,
  InboxOutlined,
  CalendarOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/reducers/modalSlice';

const { Sider } = Layout;

interface MenuItem {
  key: string;
  icon?: JSX.Element;
  label: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const getMenuItem = (
  label: string, 
  key: string, 
  icon?: JSX.Element, 
  style?: React.CSSProperties,
  onClick?: () => void
): MenuItem => ({
  key,
  icon,
  label,
  style,
  onClick,
});

const HoverableMenuItem: React.FC<MenuItem> = ({ label, icon, style, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        ...style, 
        padding: '0 16px', 
        cursor: 'pointer', 
        backgroundColor: hovered ? '#f0f0f0' : 'transparent' 
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <span>{label}</span>
      {hovered && icon && <span style={{ marginLeft: 8 }}>{icon}</span>}
    </div>
  );
};

const dispatch = useDispatch();
  
const handleClick = () => {
  dispatch(openModal());
};
 
const menuItems: MenuItem[] = [
  getMenuItem('Add Task', 'add-task', <PlusCircleOutlined />, { color: '#e74c3c' }, handleClick),
  getMenuItem('Search', 'search', <SearchOutlined />),
  getMenuItem('Inbox', 'inbox', <InboxOutlined />),
  getMenuItem('Today', 'today-task', <CalendarOutlined />),
  getMenuItem('Filter & Labels', 'filter', <AppstoreOutlined />, { color: '#e74c3c' }),
  getMenuItem('My Projects', 'projects', <PlusCircleOutlined />, { fontSize: '16px' }),
];

const Sidebar: React.FC = () => (
  <Sider width={200} className="site-layout-background">
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Menu mode="inline" defaultSelectedKeys={['1']} style={{ flex: 1 }}>
        {menuItems.map(item => (
          <Menu.Item key={item.key} style={item.style}>
            {item.key === 'projects' ? (
              <HoverableMenuItem {...item} />
            ) : (
              <span style={{ display: 'flex', alignItems: 'center' }}>
                {item.icon}
                <span style={{ marginLeft: 8 }}>{item.label}</span>
              </span>
            )}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  </Sider>
);

export default Sidebar;