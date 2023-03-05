/**
 * @author: big.bro
 * @date:  2023-03-05
 * @time: 18:36
 * @contact: chenliheng@youlai.cn
 * @description: #
 */
import './index.less';
import iconMenu from '@/assets/icons/icon-menu.svg';
import iconPlus from '@/assets/icons/icon-plus.svg';
import { useState } from 'react';
import { Popup } from 'antd-mobile';
import SideBar from '../Sidebar';
import { useModel } from '@@/exports';

const Header = () => {
  const { setMsgList } = useModel('chat');
  const [visible, setVisible] = useState(false);
  return (
    <div className="header">
      <img src={iconMenu} alt="菜单" onClick={() => setVisible(true)} />
      <span>want.chat</span>
      <img src={iconPlus} alt="新建" onClick={() => setMsgList([])} />
      <Popup
        visible={visible}
        position="left"
        className="menuPop"
        bodyStyle={{ width: '60wh' }}
        showCloseButton
        onMaskClick={() => {
          setVisible(false);
        }}
        onClose={() => {
          setVisible(false);
        }}
      >
        <SideBar />
      </Popup>
    </div>
  );
};

export default Header;
