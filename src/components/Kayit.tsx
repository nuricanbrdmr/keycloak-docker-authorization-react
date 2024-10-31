import React, { useState } from "react";
import { Form, Input, Button, Typography, Space, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  MailOutlined,
} from "@ant-design/icons";
import axios, { axiosPrivate } from "../api/axios";

const { Title, Text, Link } = Typography;

const KAYIT_URL = "/Auth/register";

// Regex kuralları
const KULLANICI_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const SIFRE_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

// Tooltip mesajları için özel bileşen
const SifreDogrulama: React.FC = () => (
  <div>
    <p>• Şifre 8-24 karakter uzunluğunda olmalı</p>
    <p>• En az bir büyük ve küçük harf olmalı</p>
    <p>• En az bir rakam ve bir özel karakter (!@#$%) içermelidir</p>
  </div>
);

const KullaniciDogrulama: React.FC = () => (
  <div>
    <p>• Kullanıcı adı 4-24 karakter uzunluğunda olmalı</p>
    <p>• Bir harfle başlamalı</p>
    <p>• Sadece harf, rakam, alt çizgi veya tire içermelidir</p>
  </div>
);

const Kayit: React.FC = () => {
  const [form] = Form.useForm();
  const [yukleniyor, setYukleniyor] = useState<boolean>(false);
  const [basarili, setBasarili] = useState<boolean>(false);

  const onFinish = async (values: {
    username: string;
    password: string;
    email: string;
    confirm: string;
  }) => {
    console.log("values", values);
    setYukleniyor(true);
    try {
      const response = await axios.post(
        KAYIT_URL,
        {
            username: values.username,
            email: values.email,
            password: values.password,
            passwordConfirm: values.confirm,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("response", response.data);
      setBasarili(true);
      message.success("Kayıt başarılı!");
      form.resetFields();
    } catch (err: any) {
      if (!err?.response) {
        message.error("Sunucu yanıt vermiyor");
      } else if (err.response?.status === 409) {
        message.error("Kullanıcı adı zaten kullanımda");
      } else {
        message.error("Kayıt başarısız");
      }
    } finally {
      setYukleniyor(false);
    }
  };

  // Şifre eşleşme kontrolü
  const SifreEslestirme = (_: any, value: string) => {
    if (!value) {
      return Promise.reject("Lütfen şifrenizi girin");
    }
    if (!SIFRE_REGEX.test(value)) {
      return Promise.reject(<SifreDogrulama />);
    }
    return Promise.resolve();
  };

  // Kullanıcı adı kontrolü
  const KullaniciAdiKontrolu = (_: any, value: string) => {
    if (!value) {
      return Promise.reject("Lütfen kullanıcı adı girin");
    }
    if (!KULLANICI_REGEX.test(value)) {
      return Promise.reject(<KullaniciDogrulama />);
    }
    return Promise.resolve();
  };

  const EpostaKontrolu = (_: any, value: string) => {
    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basit e-posta regexi
    if (!value || !emailRegExp.test(value)) {
      return Promise.reject("Geçerli bir e-posta adresi girin.");
    }
    return Promise.resolve();
  };

  if (basarili) {
    return (
      <Space direction="vertical" align="center" className="success-container">
        <CheckCircleOutlined style={{ fontSize: 48, color: "#52c41a" }} />
        <Title level={2}>Kayıt Başarılı!</Title>
        <Link href="/" strong>
          Giriş Yap
        </Link>
      </Space>
    );
  }

  return (
    <Space
      direction="vertical"
      style={{ width: "100%", maxWidth: 400, margin: "0 auto", padding: 24 }}
    >
      <Title level={2}>Kayıt Ol</Title>

      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        layout="vertical"
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label="Kullanıcı Adı"
          tooltip={{
            title: <KullaniciDogrulama />,
            icon: <InfoCircleOutlined />,
          }}
          rules={[{ validator: KullaniciAdiKontrolu }]}
        >
          <Input prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          tooltip={{
            title: "Lütfen geçerli bir e-posta adresi girin.",
            icon: <InfoCircleOutlined />,
          }}
          rules={[{ validator: EpostaKontrolu }]}
        >
          <Input prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item
          name="password"
          label="Şifre"
          tooltip={{
            title: <SifreDogrulama />,
            icon: <InfoCircleOutlined />,
          }}
          rules={[{ validator: SifreEslestirme }]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Şifre Tekrar"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Lütfen şifrenizi tekrar girin" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Şifreler eşleşmiyor");
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={yukleniyor} block>
            Kayıt Ol
          </Button>
        </Form.Item>

        <Text>
          Zaten hesabınız var mı? <Link href="/">Giriş Yap</Link>
        </Text>
      </Form>
    </Space>
  );
};

export default Kayit;
