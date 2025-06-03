import Logo from '@/app/components/Logo';

export default function CustomerLayout({ children }) {
  return (
      <div>
        <Logo />
        {children}
      </div>
  );
}
