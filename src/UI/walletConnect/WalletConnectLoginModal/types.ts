export interface LoginModalPropsType {
  lead?: string;
  title?: string;
  className?: string;
  logoutRoute?: string;
  callbackRoute: string;
  loginButtonText: string;
  shouldRenderDefaultCss?: boolean;
  token?: string;
  onClose: () => void;
}
