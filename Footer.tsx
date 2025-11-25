/**
 * Simple footer showing copyright and navigation links. The year is
 * determined at runtime.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-primary-dark text-white py-4 mt-8">
      <div className="container mx-auto text-center text-sm">
        &copy; {year} AGRIDZIO. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}