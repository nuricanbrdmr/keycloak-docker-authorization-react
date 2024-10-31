import { Link } from "react-router-dom";
import { Button, Typography, Space } from "antd";

const { Title, Paragraph } = Typography;

const KayipSayfasi = () => {
    return (
        <article style={{ textAlign: 'center', padding: '100px' }}>
            <Title level={1}>Oops!</Title>
            <Paragraph>Sayfa Bulunamadı</Paragraph>
            <Space>
                <Button type="primary">
                    <Link to="/">Ana Sayfamızı Ziyaret Edin</Link>
                </Button>
            </Space>
        </article>
    );
}

export default KayipSayfasi;
