export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">الصفحة غير موجودة</h1>
      <p className="text-gray-600 mb-4">عذراً، الصفحة التي تحاول الوصول إليها غير متوفرة.</p>
      <a href="/" className="text-primary hover:underline">العودة إلى الصفحة الرئيسية</a>
    </div>
  );
}