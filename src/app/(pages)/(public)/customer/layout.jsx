import Logo from '@/app/components/Logo';

export const metadata = {
  title: "On Table",
  description: "powered by On Table",
};

export default function RootLayout({ children }) {
  return (
      <div>
        <Logo />
        {children}
      </div>
  );
}
