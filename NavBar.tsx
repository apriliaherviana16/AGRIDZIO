import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

/**
 * The primary navigation bar. It shows the logo, navigation links and
 * authentication actions. When the user is authenticated, a profile link
 * appears; otherwise login and register links are shown.
 */
export default function NavBar() {
  const { session } = useAuth();

  return (
    <nav className="bg-primary text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">AGRIDZIO</Link>
        <div className="flex space-x-4 rtl:space-x-reverse">
          <Link href="/" className="hover:underline">الرئيسية</Link>
          <Link href="/ads/new" className="hover:underline">إضافة إعلان</Link>
          <Link href="/favorites" className="hover:underline">المفضلة</Link>
          {session ? (
            <Link href="/profile" className="hover:underline">حسابي</Link>
          ) : (
            <>
              {/*
                استخدم المسارات الفعلية بدون مجلد (auth) لأن مجلدات المجموعة في Next.js
                لا تُعد جزءاً من المسار النهائي. الروابط السابقة (/auth/login) كانت تعطي 404.
              */}
              <Link href="/login" className="hover:underline">تسجيل الدخول</Link>
              <Link href="/register" className="hover:underline">إنشاء حساب</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}