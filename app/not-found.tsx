import { asset } from "@/lib/assets";
export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">MILITECH / 404</p>
      <h1>Здесь пока нет дома</h1>
      <p>Страница не найдена. Вернитесь к проектам и начните с главного.</p>
      <a href={asset("/")} className="button primary">
        На главную →
      </a>
    </main>
  );
}
