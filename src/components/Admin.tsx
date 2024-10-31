import { Link } from "react-router-dom";
import Users from "./Kullanicilar";
import { Button, Typography, Space } from "antd";

const { Title } = Typography;

const Admin = () => {

    return (
        <section style={{ padding: '20px' }}>
            <Title level={1}>Admin Sayfası</Title>
            {/* <Users /> */}
            <Space style={{ marginTop: '20px' }}>
                <Button type="link">
                    <Link to="/">Ana Sayfa</Link>
                </Button>
            </Space>
        </section>
    );
}

export default Admin;
