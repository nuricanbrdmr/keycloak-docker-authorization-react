import { useNavigate, Link } from "react-router-dom";
import { Layout, Typography, Button, Space } from "antd";
import {
  LogoutOutlined,
  EditOutlined,
  HomeOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import useLogout from "../hooks/useLogout";

const { Content } = Layout;
const { Title, Text } = Typography;

const AnaSayfa: React.FC = () => {
  const navigate = useNavigate();
  const oturumKapat = useLogout();

  const cikisYap = async () => {
    await oturumKapat();
    localStorage.setItem("persist", "false");
    navigate("/linkpage");
  };

  return (
    <Content style={{ padding: "50px", textAlign: "center" }}>
      <Title level={2}>Ana Sayfa</Title>
      <Text strong style={{ display: "block", marginBottom: 20 }}>
        Giriş yaptınız!
      </Text>
      <Space direction="vertical" style={{ background: "transparent", boxShadow: "none" }} size="large">
        <Button type="primary" icon={<EditOutlined className="anticon-white" />}>
          <Link to="/editor">Editör Sayfasına Git</Link>
        </Button>
        <Button type="primary" icon={<HomeOutlined className="anticon-white" />}>
          <Link to="/admin">Admin Sayfasına Git</Link>
        </Button>
        <Button type="primary" icon={<LinkOutlined className="anticon-white" />}>
          <Link to="/linkpage">Link Sayfasına Git</Link>
        </Button>
      </Space>
      <div style={{ marginTop: 30 }}>
        <Button type="default" icon={<LogoutOutlined />} onClick={cikisYap}>
          Çıkış Yap
        </Button>
      </div>
    </Content>
  );
};

export default AnaSayfa;
