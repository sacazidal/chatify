"use client";

import { SwitchFormProps } from "@/types";
import { useState } from "react";
import AuthForm from "./AuthForm";
import FieldForm from "../FieldForm";
import { API_URL } from "@/utils/route";

const RegisterForm = ({ onSwitch }: SwitchFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordTwo, setPasswordTwo] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(API_URL.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          password,
          passwordTwo,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка при регистрации");
      }
    } catch (error) {
      console.error(error);
      setError("Ошибка сервера");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      title="Регистрация"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      action="Зарегистрироваться"
      secondAction="Регистрируем..."
      footerText={
        <>
          <span>У вас уже есть аккаунт? </span>
          <button
            type="button"
            onClick={onSwitch}
            className="underline underline-offset-4 cursor-pointer"
          >
            Войти
          </button>
        </>
      }
    >
      <FieldForm
        label="Почта"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        id="email"
        placeholder="eye@example.com"
      />
      <FieldForm
        label="Имя"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        type="text"
        id="firstName"
        placeholder="Иван"
      />
      <FieldForm
        label="Фамилия"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        type="text"
        id="lastName"
        placeholder="Золиков"
      />
      <FieldForm
        label="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        id="password"
      />
      <FieldForm
        label="Повторите пароль"
        value={passwordTwo}
        onChange={(e) => setPasswordTwo(e.target.value)}
        type="passwordTwo"
        id="passwordTwo"
      />
    </AuthForm>
  );
};
export default RegisterForm;
