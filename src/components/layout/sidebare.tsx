import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { 
  PlusCircleOutlined,
  SearchOutlined,
  InboxOutlined,
  CalendarOutlined,
  AppstoreOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

interface MenuItem {
  key: string;
  icon?: JSX.Element;
  label: string;
  style?: React.CSSProperties;
}

 
const getMenuItem = (
  label: string, 
  key: string, 
  icon?: JSX.Element, 
  style?: React.CSSProperties
): MenuItem => ({
  key,
  icon,
  label,
  style,
});


const HoverableMenuItem: React.FC<MenuItem> = ({ label, icon, style }) => {
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
    >
      <span>{label}</span>
      {hovered && icon && <span style={{ marginLeft: 8 }}>{icon}</span>}
    </div>
  );
};

 
const menuItems: MenuItem[] = [
  getMenuItem('Add Task', 'add-task', <PlusCircleOutlined />, { color: '#e74c3c' }),
  getMenuItem('Search', 'search', <SearchOutlined />),
  getMenuItem('Inbox', 'inbox', <InboxOutlined />),
  getMenuItem('Today', 'today-task', <CalendarOutlined />),
  getMenuItem('Filter & Labels', 'filter', <AppstoreOutlined />, { color: '#e74c3c' }),
  getMenuItem('My Projects', 'projects', <PlusCircleOutlined />,{fontSize:'16px'}),
//   getMenuItem('Add a team', 'add-team', <PlusCircleOutlined />)
];

const Sidebar: React.FC = () => (
 <Sider width={200} className="site-layout-background">
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Menu mode="inline" defaultSelectedKeys={['1']} style={{ flex: 1 }}>
        {menuItems.map(item => (
          <Menu.Item key={item.key} style={item.style} icon={item.key !== 'projects' ? item.icon : null}>
            {item.key === 'projects' ? (
              <HoverableMenuItem {...item} />
            ) : (
              <span style={{ display: 'flex', alignItems: 'center' }}>
                {item.label}
              </span>
            )}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  </Sider>
);

export default Sidebar;
