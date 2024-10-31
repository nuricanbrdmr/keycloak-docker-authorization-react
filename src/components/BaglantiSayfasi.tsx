import { Link } from "react-router-dom";
import { Typography, Card, Divider } from "antd";

const { Title, Text } = Typography;

const BaglantiSayfasi = () => {
  return (
    <section style={{ padding: "30px", maxWidth: "600px", margin: "0 auto" }}>
      <Title level={1} style={{ textAlign: "center" }}>Bağlantılar</Title>

      <Divider />
      
      <Card title={<Title level={2} style={{ margin: 0 }}>Herkese Açık</Title>} bordered={false} style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Text style={{ fontSize: 18 }}>
            <Link to="/login">Giriş</Link>
          </Text>
          <Text style={{ fontSize: 18 }}>
            <Link to="/register">Kayıt</Link>
          </Text>
        </div>
      </Card>

      <Card title={<Title level={2} style={{ margin: 0 }}>Gizli</Title>} bordered={false}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Text style={{ fontSize: 18 }}>
            <Link to="/">Ana Sayfa</Link>
          </Text>
          <Text style={{ fontSize: 18 }}>
            <Link to="/editor">Editor Sayfası</Link>
          </Text>
          <Text style={{ fontSize: 18 }}>
            <Link to="/admin">Admin Sayfası</Link>
          </Text>
        </div>
      </Card>
    </section>
  );
};

export default BaglantiSayfasi;
