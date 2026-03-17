import { Menu, Layout, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import styles from './Header.module.css';
import fifaLogo from '../../assets/images/fifa_logo.svg';

const { Header: AntHeader } = Layout;

export function Header() {
  const location = useLocation();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const activeKey = location.pathname.startsWith('/teams') ? 'teams' : 'leagues';

  const menuItems = [
    {
      key: 'leagues',
      label: <NavLink to="/leagues" onClick={() => setDrawerVisible(false)}>Лиги</NavLink>,
    },
    {
      key: 'teams',
      label: <NavLink to="/teams" onClick={() => setDrawerVisible(false)}>Команды</NavLink>,
    },
  ];

  return (
    <>
      <AntHeader className={styles['main-header']}>
        <div className={styles['header-container']}>
          <div className={styles['header-logo']}>
            <NavLink to="/" className={styles['header-logo-link']}>
              <img src={fifaLogo} alt="FIFA" width={120} height={40} />
            </NavLink>
          </div>

          <nav className={styles['header-nav-desktop']}>
            <Menu
              mode="horizontal"
              selectedKeys={[activeKey]}
              items={menuItems}
              className={styles['header-menu']}
            />
          </nav>

          <Button
            type="text"
            icon={<MenuOutlined />}
            className={styles['mobile-menu-button']}
            onClick={() => setDrawerVisible(true)}
          />
        </div>
      </AntHeader>

      <Drawer
        title="Меню"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        className={styles['mobile-drawer']}
      >
        <Menu
          mode="inline"
          selectedKeys={[activeKey]}
          items={menuItems}
          className={styles['mobile-menu']}
        />
      </Drawer>
    </>
  );
}