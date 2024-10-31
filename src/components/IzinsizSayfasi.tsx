import { useNavigate } from "react-router-dom";
import { Button, Typography, Space } from "antd";

const { Title, Paragraph } = Typography;

const IzinsizSayfasi = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section style={{ textAlign: 'center', marginTop: '50px' }}>
            <Title level={1}>İzinsiz</Title>
            <Paragraph>İstenen sayfaya erişiminiz yok.</Paragraph>
            <Space>
                <Button type="primary" onClick={goBack}>
                Geri Dön
                </Button>
            </Space>
        </section>
    );
}

export default IzinsizSayfasi;
