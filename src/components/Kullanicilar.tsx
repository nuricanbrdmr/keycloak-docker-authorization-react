import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { Typography, List, Card } from "antd";

const { Title, Text } = Typography;

const Kullanicilar: React.FC = () => {
    const [kullanicilar, setKullanicilar] = useState<string[]>([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const kontroller = new AbortController();

        const KullanicilariGetir = async () => {
            try {
                const yanit = await axiosPrivate.get('/users', {
                    signal: kontroller.signal
                });
                if (isMounted) {
                    const kullaniciIsimleri = yanit.data.map((user: { username: string }) => user.username);
                    setKullanicilar(kullaniciIsimleri);
                }
            } catch (err: any) {
                if (err.name !== "CanceledError") {
                    console.error("Bir hata oluştu:", err);
                    navigate('/login', { state: { from: location }, replace: true });
                }
            }
        };

        KullanicilariGetir();

        return () => {
            isMounted = false;
            kontroller.abort();
        };
    }, [axiosPrivate, navigate, location]);

    return (
        <Card style={{ padding: "20px", maxWidth: "600px", margin: "20px auto" }}>
            <Title level={2} style={{ textAlign: "center" }}>Kullanıcı Listesi</Title>
            {kullanicilar.length > 0 ? (
                <List
                    bordered
                    dataSource={kullanicilar}
                    renderItem={(kullanici) => (
                        <List.Item>
                            <Text>{kullanici}</Text>
                        </List.Item>
                    )}
                />
            ) : (
                <Text strong>Gösterilecek kullanıcı yok</Text>
            )}
        </Card>
    );
};

export default Kullanicilar;
