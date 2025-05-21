export type useModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type ModalProps = useModalProps & {
  children: React.ReactNode;
};

export type AuthModalType = "login" | "register" | "recovery";

export type AuthModalProps = useModalProps & {
  initialForm: AuthModalType;
};

export type AuthFormProps = {
  title: string;
  action: string;
  secondAction: string;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  footerText: React.ReactNode;
  loading: boolean;
  error: string;
};

export type SwitchFormProps = {
  onSwitch?: () => void;
  onRecovery?: () => void;
  onBackToLogin?: () => void;
  onBackToSignUp?: () => void;
  onSuccess?: () => void;
};

export type FieldFormProps = {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type: string;
  id: string;
  placeholder?: string;
  recovery?: React.ReactNode;
  disabled?: boolean;
  maxLength?: number;
};
