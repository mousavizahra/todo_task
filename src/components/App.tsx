 import { Layout} from "antd";
 import Sidebar from './share/sidebare'
 import Search from "./search/searchModal";

 const {Content} = Layout
function App() {
    return(
    <div>
      <Layout style={{height:'auto'}}>
      <Sidebar/>
      <Content>
        <Search/>
      </Content>
    </Layout>
    </div>
    )
  }
  
  export default App;