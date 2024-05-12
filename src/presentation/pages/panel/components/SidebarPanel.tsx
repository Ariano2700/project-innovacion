// Sidebar options
import SidebarOption from './SidebarOption';
import sidebarOptions from '../../../protected-routes/panel-routes';

// Logo OMA
import logo from '../../../assets/img/logo-oma.svg';

import { Link } from 'react-router-dom';

const SidebarPanel = () => {
  return (
    <aside className='drawer-side'>
      <label
        htmlFor='drawer-panel'
        aria-label='close sidebar'
        className='drawer-overlay'
      ></label>
      <nav className='w-80 min-h-full bg-[#1f2328] p-4 md:p-5'>

        <div className='flex justify-center py-4'>
          <Link to='/panel'>
            <img src={logo} alt='Logo de OMA' width={220} />
          </Link>
        </div>

        <ul className='flex flex-col gap-2'>
          {
            sidebarOptions.map(({ path, label, Icon, children }, index) => (
              <SidebarOption path={path} key={index} label={label} Icon={Icon} children={children} />
            ))
          }
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarPanel;
