 import { Layout} from "antd";
 import Sidebar from './layout/sidebare'
 import Addtolist from './addtask'

 const {Content} = Layout
function App() {
    return(
    <div>
      <Layout style={{height:'auto'}}>
      <Sidebar/>
      <Content>
        <Addtolist/>
      </Content>
    </Layout>
    </div>
    )
  }
  
  export default App;