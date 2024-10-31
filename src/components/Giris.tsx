import React, { useState, useEffect } from "react";
import { Form, Input, Button, Alert, Typography, Space, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import Cookies from "js-cookie";

const { Title } = Typography;
const LOGIN_URL = "/auth/login";

interface GirisFormDegerleri {
  kullaniciAdi: string;
  sifre: string;
  persist?: boolean;
}

const Giris: React.FC = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [form] = Form.useForm();
  const [errMsg, setErrMsg] = useState<string>("");

  const girisYap = async (values: GirisFormDegerleri) => {
    try {
      const response = await axios.post(
        LOGIN_URL,
        {
          username: values.kullaniciAdi,
          password: values.sifre,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      Cookies.set("refreshToken",refreshToken)
      setAuth({
        user: values.kullaniciAdi,
        persist,
        refreshToken,
        accessToken,
      });

      form.resetFields();
      message.success("Giriş başarılı.");
      navigate(from, { replace: true });
    } catch (err: any) {
      if (err.response?.status === 500) {
        setErrMsg("Sunucu Yanıt Vermedi");
      } else if (err.response?.status === 400) {
        setErrMsg("Kullanıcı Adı veya Şifre Eksik");
      } else {
        setErrMsg("Giriş Başarısız");
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  return (
    <div className="App">
      <Space
        direction="vertical"
        size={24}
        style={{ width: "400px", padding: "32px" }}
      >
        <div style={{ textAlign: "center" }}>
          <Title level={2}>Giriş Yap</Title>
        </div>

        {errMsg && (
          <Alert
            message={errMsg}
            type="error"
            showIcon
            style={{ marginBottom: "5px", borderRadius: "8px" }}
          />
        )}

        <Form
          form={form}
          name="login"
          onFinish={girisYap}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="kullaniciAdi"
            rules={[
              {
                required: true,
                message: "Lütfen kullanıcı adınızı girin!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Kullanıcı Adı"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="sifre"
            rules={[
              {
                required: true,
                message: "Lütfen şifrenizi girin!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Şifre"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="persist"
            valuePropName="checked"
          >
            <Checkbox onChange={() => setPersist((prev) => !prev)}>Bu Cihazı Güvenilir</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              GİRİŞ YAP
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            <p>
              Hesabınız yok mu? <Link to="/register">Kayıt Ol</Link>
            </p>
          </div>
        </Form>
      </Space>
    </div>
  );
};

export default Giris;
