"use client";

import { SwitchFormProps } from "@/types";
import { useState } from "react";
import AuthForm from "./AuthForm";
import FieldForm from "../FieldForm";
import { API_URL } from "@/utils/route";
import BtnShowPassword from "../BtnShowPassword";

const RecoveryForm = ({ onBackToLogin, onBackToSignUp }: SwitchFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [errorValue, setErrorValue] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordTwo, setPasswordTwo] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<1 | 2 | 3>(3);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setErrorValue("");
    setLoading(true);

    try {
      const response = await fetch(API_URL.RECOVERY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка смены пароля");
      }

      setStep(2);
    } catch (error) {
      console.error(error);
      setError("Ошибка сервера");
    } finally {
      setLoading(false);
    }
  };

  const handleRecovery = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(API_URL.CONFIRM_CODE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка смены пароля");
      }
      setStep(3);
    } catch (error) {
      console.error(error);
      setError("Ошибка сервера");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(API_URL.CHANGE_PASSWORD, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, password, passwordTwo }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка смены пароля");
      }

      onBackToLogin!();
    } catch (error) {
      console.error(error);
      setError("Ошибка сервера");
    } finally {
      setLoading(false);
    }
  };

  const getCurrentHandler = () => {
    switch (step) {
      case 1:
        return handleSubmit;
      case 2:
        return handleRecovery;
      case 3:
        return handleChangePassword;
    }
  };

  return (
    <AuthForm
      title="Восстановление пароля"
      onSubmit={getCurrentHandler()}
      loading={loading}
      error={error}
      action={
        step === 1
          ? "Получить код"
          : step === 2
          ? "Подтвердить код"
          : "Изменить пароль"
      }
      secondAction={
        step === 1
          ? "Отправляем..."
          : step === 2
          ? "Подтверждаем..."
          : "Изменяем..."
      }
      footerText={
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToLogin}
            className="underline underline-offset-4 cursor-pointer"
          >
            Войти
          </button>
          <button
            type="button"
            onClick={onBackToSignUp}
            className="underline underline-offset-4 cursor-pointer"
          >
            Зарегистрироваться
          </button>
        </div>
      }
    >
      {(step === 1 || step === 2) && (
        <FieldForm
          label="Почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          errorValue={errorValue}
          placeholder="eye@example.com"
          disabled={step === 2}
        />
      )}
      {step === 2 && (
        <FieldForm
          label="Шестизначный код"
          value={code}
          errorValue={errorValue}
          onChange={(e) => setCode(e.target.value)}
          type="number"
          id="code"
          placeholder="123456"
          maxLength={6}
        />
      )}
      {step === 3 && (
        <>
          <div className="relative">
            <FieldForm
              label="Новый пароль"
              value={password}
              errorValue={errorValue}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              id="newPassword"
            />
            <BtnShowPassword
              onClick={() => setShowPassword(!showPassword)}
              show={showPassword}
            />
          </div>
          <div className="relative">
            <FieldForm
              label="Повторите пароль"
              value={passwordTwo}
              onChange={(e) => setPasswordTwo(e.target.value)}
              type={showNewPassword ? "text" : "password"}
              id="newPasswordTwo"
              errorValue={errorValue}
            />
            <BtnShowPassword
              onClick={() => setShowNewPassword(!showNewPassword)}
              show={showNewPassword}
            />
          </div>
        </>
      )}
    </AuthForm>
  );
};
export default RecoveryForm;
