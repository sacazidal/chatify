"use client";

import { useState } from "react";
import AuthForm from "./AuthForm";
import { SwitchFormProps } from "@/types";
import FieldForm from "../FieldForm";
import { API_URL } from "@/utils/route";
import BtnShowPassword from "../BtnShowPassword";

const LoginForm = ({ onSwitch, onRecovery }: SwitchFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [errorValue, setErrorValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setErrorValue("");
    setLoading(true);

    try {
      const response = await fetch(API_URL.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка авторизации");
      }
    } catch (error) {
      console.log(error);
      setError("Ошибка сервера");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      onSubmit={handleSubmit}
      title="Вход"
      loading={loading}
      error={error}
      action="Войти"
      secondAction="Входим..."
      footerText={
        <>
          <span>У вас еще нет аккаунта?</span>{" "}
          <button
            className="underline underline-offset-4 cursor-pointer"
            onClick={onSwitch}
          >
            Зарегистрироваться
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
        errorValue={error}
      />
      <div className="relative">
        <FieldForm
          label="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          id="password"
          errorValue={errorValue}
          recovery={
            <button
              onClick={onRecovery}
              className="ml-auto underline-offset-4 hover:underline text-xs md:text-sm"
            >
              Забыли пароль?
            </button>
          }
        />
        <BtnShowPassword
          onClick={() => setShowPassword(!showPassword)}
          show={showPassword}
        />
      </div>
    </AuthForm>
  );
};
export default LoginForm;
