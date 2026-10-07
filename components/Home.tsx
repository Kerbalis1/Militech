"use client";
import { asset } from "@/lib/assets";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Menu,
  X,
  Check,
  CheckCheck,
  ShieldCheck,
  Ruler,
  Layers3,
  House,
  Zap,
  Paintbrush,
  Plus,
  ChevronDown,
  MapPin,
  Clock3,
  CircleCheck,
  Download,
} from "lucide-react";

const projects = [
  {
    name: "Резиденция «Сосны»",
    area: 180,
    months: "8 месяцев",
    type: "Газобетон",
    tag: "Современный",
    price: "14 400 000",
    description:
      "Один этаж, три спальни и просторная кухня-гостиная с выходом на террасу. Дом, открытый природе.",
    image: 0,
  },
  {
    name: "Дом «Север»",
    area: 120,
    months: "6 месяцев",
    type: "Каркасный",
    tag: "Скандинавский",
    price: "7 800 000",
    description:
      "Лаконичная архитектура, высокие потолки и тёплый деревянный интерьер. Всё нужное на 120 м².",
    image: 1,
  },
  {
    name: "Вилла «Горизонт»",
    area: 240,
    months: "10 месяцев",
    type: "Газобетон",
    tag: "Современный",
    price: "19 200 000",
    description:
      "Два этажа, четыре спальни и отдельный кабинет. Панорамное остекление и приватная зона для семьи.",
    image: 2,
  },
  {
    name: "Дом «Тихий сад»",
    area: 150,
    months: "7 месяцев",
    type: "Кирпич",
    tag: "Классический",
    price: "13 500 000",
    description:
      "Кирпичный дом с тремя спальнями, крытой террасой и мягкой классической геометрией.",
    image: 3,
  },
];
const services = [
  {
    icon: Ruler,
    name: "Проектирование",
    text: "От первых эскизов до рабочего проекта. Учитываем участок, привычки семьи и будущий бюджет.",
    note: "Архитектура · Конструктив · Планировки",
  },
  {
    icon: House,
    name: "Строительство под ключ",
    text: "Один ответственный подрядчик на весь цикл. От подготовки участка до дома, готового к жизни.",
    note: "Полный цикл · Единая ответственность",
  },
  {
    icon: Layers3,
    name: "Фундамент",
    text: "Подбираем решение по результатам геологии. Рассчитываем нагрузки, выполняем земляные и бетонные работы.",
    note: "Геология · Расчёт · Устройство",
  },
  {
    icon: Zap,
    name: "Инженерные системы",
    text: "Отопление, вода, электрика и вентиляция. Системы, которые работают незаметно и делают дом комфортным.",
    note: "Проектирование · Монтаж · Проверка",
  },
  {
    icon: Paintbrush,
    name: "Отделка",
    text: "От черновых работ до чистовых деталей. Согласуем материалы и реализуем цельный интерьер.",
    note: "Материалы · Интерьер · Детали",
  },
];
const advantages = [
  [
    "Фиксированная смета",
    "Состав работ и стоимость закреплены в договоре. Изменения — только после вашего согласования.",
  ],
  [
    "Технический надзор",
    "Проверка каждого этапа, скрытых работ и соответствия проекту до перехода к следующему.",
  ],
  [
    "Этапная оплата",
    "Понятный график платежей. Вы принимаете результат этапа и знаете, за что платите.",
  ],
  [
    "Гарантия по договору",
    "Обязательства, сроки и порядок обращения фиксируются до начала строительства.",
  ],
  [
    "Фотоотчёты",
    "Регулярные фотографии с объекта и короткий отчёт: что сделано и что будет дальше.",
  ],
];
const steps = [
  ["Заявка", "Знакомимся с вашей задачей"],
  ["Консультация", "Обсуждаем участок и бюджет"],
  ["Проект", "Создаём архитектуру для вас"],
  ["Смета", "Считаем работы и материалы"],
  ["Договор", "Фиксируем сроки и условия"],
  ["Строительство", "Реализуем проект по этапам"],
  ["Сдача", "Проверяем и передаём ключи"],
];
const questions = [
  [
    "Что входит в строительство под ключ?",
    "В демонстрационном расчёте учтены фундамент, коробка, кровля, окна, базовые инженерные системы и стандартная чистовая отделка. Участок, мебель, благоустройство и внешние подключения не включены. Для реального проекта состав работ подробно фиксируется в смете.",
  ],
  [
    "Можно построить дом по моему проекту?",
    "Да, такой сценарий предусмотрен: сначала проверяем архитектурные и конструктивные решения, адаптируем их к участку и рассчитываем смету. Если проекта ещё нет, можно начать с индивидуального проектирования.",
  ],
  [
    "Как формируется стоимость дома?",
    "Она зависит от площади, технологии строительства, геологии участка, архитектуры и уровня отделки. Калькулятор показывает ориентир по демонстрационным ставкам. Точная стоимость возможна после изучения участка и проекта.",
  ],
  [
    "Когда лучше начинать строительство?",
    "Проектирование и изучение участка можно начать в любое время года. График строительных работ зависит от технологии, погоды и готовности проекта; его согласуют перед подписанием договора.",
  ],
  [
    "Как я буду контролировать ход работ?",
    "В концепции сервиса предусмотрены этапная приёмка, технический надзор и регулярные фотоотчёты. График посещений объекта и формат связи закрепляются в договоре.",
  ],
  [
    "Для чего нужен расчёт на сайте?",
    "Калькулятор помогает оценить предварительный бюджет дома по выбранной технологии и площади. В этой версии сайта расчёт демонстрационный: проекты, сроки и цены приведены для примера. Форма не отправляет персональные данные и не создаёт заявку.",
  ],
];
const rub = (v: number) => new Intl.NumberFormat("ru-RU").format(v);
const rates: Record<string, number> = {
  Газобетон: 80000,
  Каркасный: 65000,
  Кирпич: 90000,
};
type Values = { type: string; area: string; name: string; phone: string };
type Errors = Partial<Record<keyof Values, string>>;
function validate(v: Values): Errors {
  const e: Errors = {};
  if (!rates[v.type]) e.type = "Выберите технологию строительства";
  if (
    !v.area ||
    !Number.isFinite(Number(v.area)) ||
    Number(v.area) < 50 ||
    Number(v.area) > 500
  )
    e.area = "Укажите площадь от 50 до 500 м²";
  if (!/^[\p{L}][\p{L}\s’'-]{1,59}$/u.test(v.name.trim()))
    e.name = "Введите имя: от 2 до 60 букв";
  const digits = v.phone.replace(/\D/g, "");
  if (!/^[78]\d{10}$/.test(digits))
    e.phone = "Введите российский номер: +7 и 10 цифр";
  return e;
}
export default function Home() {
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState("Все проекты");
  const [values, setValues] = useState<Values>({
    type: "Газобетон",
    area: "180",
    name: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [selection, setSelection] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const estimate = rates[values.type] * Number(values.area);
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    nodes.forEach((node) => {
      node.classList.add("reveal-ready");
      observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menu) {
        setMenu(false);
        menuRef.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menu]);
  function change(key: keyof Values, value: string) {
    if (key === "type" || key === "area") setSelection("");
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    setStatus("idle");
  }
  function choose(p: (typeof projects)[number]) {
    setValues((v) => ({ ...v, type: p.type, area: String(p.area) }));
    setSelection(p.name);
    setStatus("idle");
    setErrors({});
    document.getElementById("estimate")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    requestAnimationFrame(() =>
      nameRef.current?.focus({ preventScroll: true }),
    );
  }
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("error");
      const key = Object.keys(nextErrors)[0];
      document.getElementById(`field-${key}`)?.focus();
      return;
    }
    setStatus("success");
    requestAnimationFrame(() =>
      resultRef.current?.focus({ preventScroll: true }),
    );
  }
  function download() {
    const content = `MILITECH · Демонстрационный расчёт\nТехнология: ${values.type}\nПлощадь: ${values.area} м²\nОриентировочная стоимость: от ${rub(estimate)} ₽\n\nСтавка: ${rub(rates[values.type])} ₽/м².\nВключены фундамент, коробка, кровля, окна, базовые инженерные системы и стандартная чистовая отделка. Не включены участок, мебель, благоустройство и внешние подключения.\nРасчёт демонстрационный и не является офертой. Персональные данные не сохраняются и не отправляются.\nДемонстрационный проект ELEMENT DIGITAL.`;
    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + content], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "MILITECH-расчёт.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Перейти к содержимому
      </a>
      <header className="header">
        <div className="header-inner">
          <a href="#" className="brand" aria-label="MILITECH — на главную">
            <span className="brand-symbol" aria-hidden="true">
              M
            </span>
            MILITECH<span className="brand-dot">.</span>
          </a>
          <nav className="desktop-nav" aria-label="Основная навигация">
            <a href="#projects">Проекты</a>
            <a href="#services">Услуги</a>
            <a href="#approach">О компании</a>
            <a href="#contacts">Контакты</a>
          </nav>
          <a href="#estimate" className="header-cta">
            Обсудить проект <ArrowUpRight size={17} />
          </a>
          <button
            ref={menuRef}
            className="menu-button"
            onClick={() => setMenu(!menu)}
            aria-expanded={menu}
            aria-controls="mobile-nav"
            aria-label={menu ? "Закрыть меню" : "Открыть меню"}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
        {menu && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Мобильная навигация"
          >
            {[
              ["Проекты", "projects"],
              ["Услуги", "services"],
              ["О компании", "approach"],
              ["Контакты", "contacts"],
              ["Рассчитать стоимость", "estimate"],
            ].map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                {label}
                <ArrowUpRight size={18} />
              </a>
            ))}
          </nav>
        )}
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <picture className="hero-image">
            <source
              media="(max-width: 640px)"
              srcSet={asset("/images/hero-mobile.webp")}
            />
            <img
              src={asset("/images/hero.webp")}
              width="1536"
              height="1024"
              fetchPriority="high"
              alt="Современный загородный дом с панорамными окнами, террасой и тёплым светом внутри"
            />
          </picture>
          <div className="hero-shade" />
          <div className="container hero-content">
            <p className="eyebrow hero-eyebrow">
              <span /> АРХИТЕКТУРА ДЛЯ ЖИЗНИ
            </p>
            <h1 id="hero-title">
              Строим дома,
              <br />в которых
              <br />
              <span>хочется жить</span>
            </h1>
            <p className="hero-description">
              Частные дома под ключ — от первой идеи
              <br className="desktop-break" /> до момента, когда вы открываете
              свою дверь.
            </p>
            <div className="hero-actions">
              <a href="#estimate" className="button primary">
                Рассчитать стоимость <ArrowUpRight size={20} />
              </a>
              <a href="#projects" className="button glass">
                Посмотреть проекты <ArrowRight size={19} />
              </a>
            </div>
            <div className="hero-metrics">
              <div>
                <strong>01</strong>
                <span>договор на весь цикл</span>
              </div>
              <div>
                <strong>7</strong>
                <span>понятных этапов</span>
              </div>
              <div>
                <strong>
                  100<span>%</span>
                </strong>
                <span>прозрачная смета</span>
              </div>
            </div>
            <p className="hero-demo">
              Демонстрационная концепция строительной компании
            </p>
          </div>
          <div className="hero-bottom">
            <span>ПРОДУМАНО ДО ПОСЛЕДНЕЙ ДЕТАЛИ</span>
            <a href="#projects" aria-label="Перейти к проектам">
              <ArrowDown size={18} />
            </a>
            <span>ДОМ НАЧИНАЕТСЯ С ВАС</span>
          </div>
          <div className="hero-caption">
            <span className="caption-line" />
            <span>
              Резиденция «Сосны»
              <small>180 м² · Архитектурная визуализация</small>
            </span>
          </div>
        </section>
        <section className="intro section container reveal">
          <p className="eyebrow">01 / НАША ФИЛОСОФИЯ</p>
          <div className="intro-grid">
            <h2>
              Больше, чем стены.
              <br />
              <span className="muted">Место вашей жизни.</span>
            </h2>
            <div>
              <p>
                Утренний свет на кухне. Тишина в кабинете. Большой стол, за
                которым собирается вся семья.
              </p>
              <p className="muted">
                Мы начинаем с того, как вы хотите жить. И превращаем это в
                архитектуру, понятный проект и последовательный процесс
                строительства.
              </p>
              <a className="text-link" href="#approach">
                Наш подход <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>
        <section className="projects section" id="projects">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow">02 / ПОРТФОЛИО</p>
                <h2>Дома с характером</h2>
              </div>
              <p>
                Разная архитектура. Одна философия —<br />
                комфорт, который чувствуется каждый день.
              </p>
            </div>
            <div className="project-toolbar">
              <div
                className="filters"
                role="group"
                aria-label="Фильтр проектов"
              >
                {[
                  "Все проекты",
                  "Современный",
                  "Скандинавский",
                  "Классический",
                ].map((f) => (
                  <button
                    key={f}
                    className={filter === f ? "active" : ""}
                    aria-pressed={filter === f}
                    onClick={() => setFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <span className="small-muted">04 демонстрационных проекта</span>
            </div>
            <div className="project-grid" aria-live="polite">
              {projects
                .filter((p) => filter === "Все проекты" || p.tag === filter)
                .map((p) => (
                  <article className="project-card" key={p.name}>
                    <div className={`project-image crop-${p.image}`}>
                      <img
                        src={asset(`/images/project-${p.image}.webp`)}
                        alt={`Архитектурная визуализация: ${p.name}`}
                        width="627"
                        height="627"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="project-tag">{p.tag}</span>
                      <button
                        className="project-arrow"
                        onClick={() => choose(p)}
                        aria-label={`Рассчитать ${p.name}`}
                      >
                        <ArrowUpRight />
                      </button>
                    </div>
                    <div className="project-info">
                      <div className="project-title">
                        <h3>{p.name}</h3>
                        <span>от {p.price} ₽</span>
                      </div>
                      <p>{p.description}</p>
                      <dl>
                        <div>
                          <dt>Площадь</dt>
                          <dd>{p.area} м²</dd>
                        </div>
                        <div>
                          <dt>Срок</dt>
                          <dd>{p.months}</dd>
                        </div>
                        <div>
                          <dt>Технология</dt>
                          <dd>{p.type}</dd>
                        </div>
                      </dl>
                    </div>
                  </article>
                ))}
            </div>
            <div className="project-footnote">
              <span>
                Концепции реализованных проектов. Изображения, сроки и цены —
                демонстрационные.
              </span>
              <a href="#estimate" className="text-link">
                Дом по вашему проекту <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>
        <section className="services section container" id="services">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">03 / КОМПЕТЕНЦИИ</p>
              <h2>От идеи до ключей</h2>
            </div>
            <p>
              Берём на себя весь путь.
              <br />
              Вы выбираете, как будет выглядеть ваша жизнь.
            </p>
          </div>
          <div className="service-list">
            {services.map((s, i) => (
              <a className="service-row reveal" href="#estimate" key={s.name}>
                <span className="service-number">0{i + 1}</span>
                <s.icon className="service-icon" size={28} strokeWidth={1.3} />
                <h3>{s.name}</h3>
                <div className="service-text">
                  <p>{s.text}</p>
                  <span>{s.note}</span>
                </div>
                <ArrowUpRight className="service-arrow" size={23} />
              </a>
            ))}
          </div>
        </section>
        <section className="approach section" id="approach">
          <div className="container approach-grid">
            <div className="approach-left reveal">
              <p className="eyebrow">04 / ПРИНЦИПЫ MILITECH</p>
              <h2>
                Спокойствие —<br />
                тоже часть
                <br />
                <span>хорошего дома.</span>
              </h2>
              <p>
                Строительство не должно быть неизвестностью. Мы делаем процесс
                понятным, а каждое решение — обоснованным.
              </p>
              <div
                className="approach-image"
                style={{
                  backgroundImage: `url(${asset("/images/project-0.webp")})`,
                }}
                role="img"
                aria-label="Визуализация современного дома с большими окнами"
              />
              <span className="image-note">
                Архитектурная визуализация · демо-проект
              </span>
            </div>
            <div className="advantages">
              {advantages.map(([title, text], i) => (
                <article className="advantage reveal" key={title}>
                  <span className="advantage-icon">
                    {i === 3 ? (
                      <ShieldCheck size={23} strokeWidth={1.4} />
                    ) : (
                      <CheckCheck size={23} strokeWidth={1.4} />
                    )}
                  </span>
                  <div>
                    <span className="advantage-number">0{i + 1}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="process section container" id="process">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">05 / ПРОЦЕСС</p>
              <h2>Понятный путь к своему дому</h2>
            </div>
            <p>
              Сначала ясность.
              <br />
              Затем — строительство.
            </p>
          </div>
          <ol className="steps">
            {steps.map(([title, text], i) => (
              <li className="step reveal" key={title}>
                <div className="step-top">
                  <span>0{i + 1}</span>
                  {i === 6 ? <Check size={18} /> : <ArrowRight size={18} />}
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="estimate section" id="estimate">
          <div className="container estimate-grid">
            <div className="estimate-copy reveal">
              <p className="eyebrow">06 / ВАШ БУДУЩИЙ ДОМ</p>
              <h2>
                Большие планы.
                <br />
                <span>Понятные цифры.</span>
              </h2>
              <p>
                Узнайте ориентировочный бюджет вашего дома. Выберите технологию
                и площадь — мы покажем, с чего начать.
              </p>
              <ul className="estimate-promises">
                <li>
                  <CircleCheck size={18} /> Расчёт за одну минуту
                </li>
                <li>
                  <CircleCheck size={18} /> Прозрачная стоимость за м²
                </li>
                <li>
                  <CircleCheck size={18} /> Без обязательств
                </li>
              </ul>
              <div className="estimate-note">
                <ShieldCheck size={24} strokeWidth={1.3} />
                <p>
                  Это демо-калькулятор. Данные остаются в вашем браузере и не
                  отправляются. Заявка не создаётся.
                </p>
              </div>
            </div>
            <div className="form-card">
              {status === "success" ? (
                <div
                  className="success"
                  ref={resultRef}
                  tabIndex={-1}
                  role="status"
                >
                  <span className="success-icon">
                    <Check size={32} />
                  </span>
                  <p className="eyebrow">РАСЧЁТ ГОТОВ</p>
                  <h3>
                    {values.name.trim()}, ваш дом
                    <br />
                    начинается здесь.
                  </h3>
                  <p>
                    {values.type} · {values.area} м²
                  </p>
                  <strong>от {rub(estimate)} ₽</strong>
                  <p className="result-caption">
                    Ориентир по демонстрационной ставке{" "}
                    {rub(rates[values.type])} ₽/м². Точная смета зависит от
                    участка, проекта и комплектации.
                  </p>
                  <button className="button primary" onClick={download}>
                    Скачать расчёт <Download size={18} />
                  </button>
                  <button
                    className="text-link reset-button"
                    onClick={() => {
                      setStatus("idle");
                      setSelection("");
                    }}
                  >
                    Изменить параметры <ArrowRight size={17} />
                  </button>
                  <span className="small-muted">
                    Демо-расчёт выполнен. Заявка не отправлена.
                  </span>
                </div>
              ) : (
                <form noValidate onSubmit={submit}>
                  <div className="form-heading">
                    <h3>Рассчитать стоимость</h3>
                    <span>01 — 04</span>
                  </div>
                  {selection && (
                    <p className="selected-project">
                      <Check size={15} /> Выбран проект: {selection}
                    </p>
                  )}
                  <div className="form-field">
                    <label htmlFor="field-type">Технология строительства</label>
                    <div className="select-wrap">
                      <select
                        id="field-type"
                        value={values.type}
                        onChange={(e) => change("type", e.target.value)}
                        aria-invalid={!!errors.type}
                        aria-describedby={
                          errors.type ? "error-type" : undefined
                        }
                      >
                        {Object.keys(rates).map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                      <ChevronDown size={18} />
                    </div>
                    {errors.type && (
                      <p className="field-error" id="error-type">
                        {errors.type}
                      </p>
                    )}
                  </div>
                  <div className="form-field">
                    <label htmlFor="field-area">
                      Площадь дома <span>50–500 м²</span>
                    </label>
                    <div className="input-wrap">
                      <input
                        type="number"
                        id="field-area"
                        min={50}
                        max={500}
                        step={1}
                        value={values.area}
                        onChange={(e) => change("area", e.target.value)}
                        aria-invalid={!!errors.area}
                        aria-describedby={
                          errors.area ? "error-area" : undefined
                        }
                        required
                        inputMode="numeric"
                      />
                      <span>м²</span>
                    </div>
                    {errors.area && (
                      <p className="field-error" id="error-area">
                        {errors.area}
                      </p>
                    )}
                  </div>
                  <div className="form-pair">
                    <div className="form-field">
                      <label htmlFor="field-name">Ваше имя</label>
                      <input
                        ref={nameRef}
                        id="field-name"
                        autoComplete="given-name"
                        maxLength={60}
                        placeholder="Александр"
                        value={values.name}
                        onChange={(e) => change("name", e.target.value)}
                        aria-invalid={!!errors.name}
                        aria-describedby={
                          errors.name ? "error-name" : undefined
                        }
                        required
                      />
                      {errors.name && (
                        <p className="field-error" id="error-name">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="form-field">
                      <label htmlFor="field-phone">Телефон</label>
                      <input
                        type="tel"
                        id="field-phone"
                        autoComplete="tel"
                        placeholder="+7 (999) 123-45-67"
                        maxLength={22}
                        value={values.phone}
                        onChange={(e) => change("phone", e.target.value)}
                        aria-invalid={!!errors.phone}
                        aria-describedby={
                          errors.phone ? "error-phone" : undefined
                        }
                        required
                      />
                      {errors.phone && (
                        <p className="field-error" id="error-phone">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="live-estimate">
                    <span>Предварительный бюджет</span>
                    <strong>
                      {Number(values.area) >= 50 && Number(values.area) <= 500
                        ? `от ${rub(estimate)} ₽`
                        : "Укажите площадь"}
                    </strong>
                  </div>
                  {status === "error" && (
                    <p className="form-error" role="alert">
                      Проверьте выделенные поля, чтобы получить расчёт.
                    </p>
                  )}
                  <button
                    className="button primary submit-button"
                    type="submit"
                  >
                    Получить расчёт <ArrowUpRight size={20} />
                  </button>
                  <p className="form-disclaimer">
                    Нажимая кнопку, вы запускаете демонстрационный расчёт.
                    Контакты не сохраняются.{" "}
                    <a href="#demo-info">Подробнее о проекте</a>
                  </p>
                </form>
              )}
            </div>
          </div>
          <div className="container estimate-inclusions">
            <span>
              В ориентир входят: фундамент, коробка, кровля, окна, базовая
              инженерия и стандартная отделка.
            </span>
            <span>
              Без участка, мебели, благоустройства и внешних подключений. Не
              является офертой.
            </span>
          </div>
        </section>
        <section className="faq section container">
          <div className="faq-grid">
            <div className="reveal">
              <p className="eyebrow">07 / ВОПРОСЫ И ОТВЕТЫ</p>
              <h2>
                Всё начинается
                <br />с вопросов.
              </h2>
              <p className="muted faq-intro">
                Собрали то, что важно знать
                <br />
                перед первым шагом.
              </p>
              <a href="#estimate" className="text-link">
                Обсудить мой дом <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="faq-list">
              {questions.map(([q, a], i) => (
                <details key={q}>
                  <summary>
                    <span className="faq-number">0{i + 1}</span>
                    <span>{q}</span>
                    <Plus size={19} />
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="final-cta">
          <div className="container final-inner reveal">
            <div>
              <p className="eyebrow">ВАШ ДОМ. ВАША ИСТОРИЯ.</p>
              <h2>
                Давайте построим
                <br />
                что-то настоящее.
              </h2>
            </div>
            <a href="#estimate" className="button primary">
              Начать с расчёта <ArrowUpRight size={21} />
            </a>
          </div>
        </section>
      </main>
      <footer id="contacts">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <a href="#" className="brand">
                <span className="brand-symbol" aria-hidden="true">
                  M
                </span>
                MILITECH<span className="brand-dot">.</span>
              </a>
              <p>
                Продуманная архитектура.
                <br />
                Уверенное строительство.
              </p>
              <span className="demo-pill">Строительство частных домов</span>
            </div>
            <div>
              <h3>Навигация</h3>
              <a href="#projects">Проекты домов</a>
              <a href="#services">Наши услуги</a>
              <a href="#process">Этапы работы</a>
              <a href="#estimate">Расчёт стоимости</a>
            </div>
            <div className="footer-contact">
              <h3>Контакты · демо</h3>
              <p className="contact-large">Ваши контакты здесь</p>
              <span>
                <MapPin size={15} /> Москва и Московская область
              </span>
              <span>
                <Clock3 size={15} /> Пн–Пт, 09:00–18:00
              </span>
              <a href="#estimate" className="text-link">
                Перейти к форме <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div id="demo-info" className="demo-info">
            MILITECH — строительная компания. Проекты, сроки и цены на этой
            странице приведены для примера. Форма выполняет предварительный
            расчёт и не отправляет заявки.
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} MILITECH</span>
            <span>
              Демонстрационный проект <strong>ELEMENT DIGITAL</strong>
            </span>
            <a href="#" aria-label="Вернуться к началу страницы">
              Наверх <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
