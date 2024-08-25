import RootLayout from './layout';
import Navbar from '../components/Navbar';

export default function App({ children }) {
  return (
    <RootLayout >
      <Navbar />
      {children}
    </RootLayout>
  );
}

