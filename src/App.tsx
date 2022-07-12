import './App.css';
import { Layout, Space, Spin, Typography } from 'antd'
import { TodoInput } from './Components/TodoInput';
import { TodoList } from './Components/TodoList';
import { ImportTodos } from './Components/Buttons/ImportTodos';
import { ExportTodos } from './Components/Buttons/ExportTodos';
import { useState } from 'react';
import { SortList } from './Components/Buttons/SortList';

const { Header, Content, Footer } = Layout
const { Title } = Typography

function App() {

  const [isLoading, setIsLoading] = useState(false)

  return (
    <Layout className="App">
      <Header className="App-header">
        <Space size={"middle"}>
          <ImportTodos setIsLoading={setIsLoading} />
          <ExportTodos />
        </Space>
        <Space>
          <Title level={3} style={{ color: "#f0f2f5" }}>My TODO List</Title>
          <SortList />
        </Space>
        <TodoInput />
      </Header>
      <Content className="site-layout-content" style={{height:"100%", overflow: "scroll"}}>
        {isLoading ? <Spin tip="Loading..." /> : <TodoList />}
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
}

export default App;
