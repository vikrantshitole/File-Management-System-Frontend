import React, { useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import LeftPanel from '../../navigation/LeftPanel';
import Sidebar from '../../navigation/Sidebar';
import MainContent from '../MainContent';
import Header from '../Header';
import FileViewer from '../../content/FileViewer';
import { selectCurrentFile } from '../../../store/slices/fileSlice';
import '../../../styles/components/layout/_layout.scss';

const Layout = React.memo(() => {
  const file = useSelector(selectCurrentFile);
  const [filterData, setFilterData] = useState({});
  const [sideBarOpen, setSideBarOpen] = useState(true);

  const handleSetFilterData = useCallback((data) => {
    setFilterData(data);
  }, []);

  const handleSetSideBarOpen = useCallback((isOpen) => {
    setSideBarOpen(isOpen);
  }, []);

  const mainStyle = useMemo(() => ({
    width: file ? '80%' : '100%'
  }), [file]);

  return (
    <div className="layout">
      <LeftPanel />
      <div className="layout__container">
        <Sidebar sideBarOpen={sideBarOpen} />
        <div className="layout__main" style={mainStyle}>
          <Header
            setFilterData={handleSetFilterData}
            setSideBarOpen={handleSetSideBarOpen}
            sideBarOpen={sideBarOpen}
          />
          <div className="layout__main-content">
            <MainContent filterData={filterData} />
            <FileViewer />
          </div>
        </div>
      </div>
    </div>
  );
});

Layout.displayName = 'Layout';

export default Layout;
