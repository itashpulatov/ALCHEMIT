import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  Code,
  Smartphone,
  Database,
  MessageSquare,
  Zap,
  Headphones,
  Globe,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { threadId } from "node:worker_threads";

const languages = {
  en: { name: "English", flag: "/public/images/gb.png" },
  ru: { name: "Русский", flag: "/public/images/rus (1).png" },
  uz: { name: "O'zbek", flag: "/public/images/uzb.png" },
} as const;
// Multilingual content
const translations = {
  ru: {
    // Navigation
    about: "О компании",
    services: "Услуги",
    contacts: "Контакты",
    ourAddress: "Наш адрес",

    // Hero section
    heroTitle: "Мы превращаем идеи в цифровые решения",
    heroDescription:
      "Alchemit — ваш надёжный партнёр в мире IT. Создаём современные веб-сайты, мобильные приложения и автоматизируем бизнес-процессы.",
    contactUs: "Связаться с нами",

    // About section
    aboutTitle: "О компании Alchemit",
    aboutDescription:
      "Мы — команда профессионалов, специализирующихся на разработке IT-решений для бизнеса. Наша миссия — помочь компаниям достичь успеха через инновационные технологии и качественную техническую поддержку.",

    // Services
    // ourAddress: "Наш адрес",
    servicesTitle: "Наши услуги",
    webDev: "Web-разработка",
    webDevDesc: "Создание современных веб-сайтов и веб-приложений",
    mobileDev: "Mobile-разработка",
    mobileDevDesc: "Разработка мобильных приложений для iOS и Android",
    crmSystems: "CRM-системы",
    crmSystemsDesc: "Создание систем управления взаимоотношениями с клиентами",
    telegramBots: "Telegram-боты",
    telegramBotsDesc: "Разработка автоматизированных ботов для Telegram",
    integrations: "Интеграции",
    integrationsDesc: "Автоматизация и интеграция бизнес-процессов",
    support: "Поддержка",
    supportDesc: "Техническая поддержка и сопровождение проектов",

    // Portfolio
    portfolioTitle: "Наши проекты",
    project1: "Корпоративный веб-сайт",
    project1Desc: "Современный адаптивный сайт для IT-компании",
    project2: "Мобильное приложение",
    project2Desc: "Кроссплатформенное приложение для бизнеса",
    project3: "CRM-система",
    project3Desc: "Система управления клиентами и продажами",
    project4: "Telegram-бот",
    project4Desc: "Автоматизированный бот для клиентского сервиса",
    viewProject: "Посмотреть проект",

    // Contact form
    contactTitle: "Свяжитесь с нами",
    contactDescription: "Готовы обсудить ваш проект? Напишите нам!",
    name: "Имя",
    email: "Email",
    phone: "Телефон",
    message: "Сообщение",
    send: "Отправить",

    // Footer
    footerText: "© 2025 Alchemit. Все права защищены.",
  },
  en: {
    // Navigation
    ourAddress: "Our address",
    about: "About",
    services: "Services",
    contacts: "Contacts",

    // Hero section
    heroTitle: "We turn ideas into digital solutions",
    heroDescription:
      "Alchemit is your reliable partner in the IT world. We create modern websites, mobile applications and automate business processes.",
    contactUs: "Contact Us",

    // About section
    aboutTitle: "About Alchemit",
    aboutDescription:
      "We are a team of professionals specializing in developing IT solutions for business. Our mission is to help companies achieve success through innovative technologies and quality technical support.",

    // Services
    servicesTitle: "Our Services",
    webDev: "Web Development",
    webDevDesc: "Creating modern websites and web applications",
    mobileDev: "Mobile Development",
    mobileDevDesc: "Developing mobile applications for iOS and Android",
    crmSystems: "CRM Systems",
    crmSystemsDesc: "Creating customer relationship management systems",
    telegramBots: "Telegram Bots",
    telegramBotsDesc: "Development of automated bots for Telegram",
    integrations: "Integrations",
    integrationsDesc: "Automation and integration of business processes",
    support: "Support",
    supportDesc: "Technical support and project maintenance",

    // Portfolio
    portfolioTitle: "Our Projects",
    project1: "Corporate Website",
    project1Desc: "Modern responsive website for IT company",
    project2: "Mobile Application",
    project2Desc: "Cross-platform business application",
    project3: "CRM System",
    project3Desc: "Customer and sales management system",
    project4: "Telegram Bot",
    project4Desc: "Automated bot for customer service",
    viewProject: "View Project",

    // Contact form
    contactTitle: "Contact Us",
    contactDescription: "Ready to discuss your project? Write to us!",
    name: "Name",
    email: "Email",
    phone: "Phone",
    message: "Message",
    send: "Send",

    // Footer
    footerText: "© 2025 Alchemit. All rights reserved.",
  },
  uz: {
    // Navigation
    ourAddress: "Bizning manzil",
    about: "Kompaniya haqida",
    services: "Xizmatlar",
    portfolio: "Portfolio",
    contacts: "Kontaktlar",

    // Hero section
    heroTitle: "Biz g'oyalarni raqamli yechimlarga aylantiramiz",
    heroDescription:
      "Alchemit - IT olamida ishonchli hamkoringiz. Zamonaviy veb-saytlar, mobil ilovalar yaratamiz va biznes jarayonlarini avtomatlashtirramiz.",
    contactUs: "Biz bilan bog'laning",

    // About section
    aboutTitle: "Alchemit haqida",
    aboutDescription:
      "Biz biznes uchun IT yechimlari ishlab chiqishga ixtisoslashgan mutaxassislar jamoasimiz. Bizning missiyamiz - innovatsion texnologiyalar va sifatli texnik yordam orqali kompaniyalarga muvaffaqiyatga erishishda yordam berish.",

    // Services
    servicesTitle: "Bizning xizmatlarimiz",
    webDev: "Veb-ishlab chiqish",
    webDevDesc: "Zamonaviy veb-saytlar va veb-ilovalar yaratish",
    mobileDev: "Mobil ishlab chiqish",
    mobileDevDesc: "iOS va Android uchun mobil ilovalar ishlab chiqish",
    crmSystems: "CRM tizimlari",
    crmSystemsDesc:
      "Mijozlar bilan munosabatlarni boshqarish tizimlari yaratish",
    telegramBots: "Telegram botlari",
    telegramBotsDesc:
      "Telegram uchun avtomatlashtirilgan botlar ishlab chiqish",
    integrations: "Integratsiyalar",
    integrationsDesc:
      "Biznes jarayonlarini avtomatlashtirish va integratsiya qilish",
    support: "Qo'llab-quvvatlash",
    supportDesc: "Texnik yordam va loyihalarni qo'llab-quvvatlash",

    // Portfolio
    portfolioTitle: "Bizning loyihalarimiz",
    project1: "Korporativ veb-sayt",
    project1Desc: "IT kompaniyasi uchun zamonaviy moslashuvchan sayt",
    project2: "Mobil ilova",
    project2Desc: "Biznes uchun cross-platform ilova",
    project3: "CRM tizimi",
    project3Desc: "Mijozlar va sotuvlarni boshqarish tizimi",
    project4: "Telegram bot",
    project4Desc: "Mijozlarga xizmat ko'rsatish uchun avtomatlashtirilgan bot",
    viewProject: "Loyihani ko'rish",

    // Contact form
    contactTitle: "Biz bilan bog'laning",
    contactDescription:
      "Loyihangizni muhokama qilishga tayyormisiz? Bizga yozing!",
    name: "Ism",
    email: "Email",
    phone: "Telefon",

    message: "Xabar",
    send: "Yuborish",

    // Footer
    footerText: "© 2025 Alchemit. Barcha huquqlar himoyalangan.",
  },
};

const Index = () => {
  const [currentLang, setCurrentLang] = useState<"ru" | "en" | "uz">("ru");
  const [isOpen, setIsOpen] = useState(false);
  const [contactType, setContactType] = useState<"email" | "phone">("email");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  type FormDataType = {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  const TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT;
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTelegramSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const contactValue =
      contactType === "email" ? formData.email : formData.phone;

    const text = `Yangi xabar:\nIsm: ${formData.name}\nKontakt: ${contactValue}\nXabar: ${formData.message}`;

    console.log("Telegramga yuboriladigan ma'lumot:", {
      chat_id: CHAT_ID,
      text,
    });

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text,
            message_thread_id: 2,
          }),
        }
      );

      const data = await response.json();

      console.log("Telegramdan kelgan javob:", data);

      if (data.ok) {
        Swal.fire({
          title: "Заявка отправлена!",
          text: "Спасибо за ваше обращение! Наш оператор свяжется с вами в ближайшее время.",
          icon: "success",
          confirmButtonText: "Понятно",
        });

        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        Swal.fire({
          title: "Ошибка!",
          text: "Не удалось отправить сообщение.",
          icon: "error",
          confirmButtonText: "Закрыть",
        });
        console.error("Telegram xatolik:", data);
      }
    } catch (error) {
      console.error("Fetch xatolik:", error);
      Swal.fire({
        title: "Ошибка!",
        text: "Не удалось отправить сообщение.",
        icon: "error",
        confirmButtonText: "Закрыть",
      });
    }
  };

  const t = translations[currentLang];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  // shu yerga joylashtirib ber

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submitted:", formData);
  };

  const services = [
    { icon: Code, title: t.webDev, description: t.webDevDesc },
    { icon: Smartphone, title: t.mobileDev, description: t.mobileDevDesc },
    { icon: Database, title: t.crmSystems, description: t.crmSystemsDesc },
    {
      icon: MessageSquare,
      title: t.telegramBots,
      description: t.telegramBotsDesc,
    },
    { icon: Zap, title: t.integrations, description: t.integrationsDesc },
    { icon: Headphones, title: t.support, description: t.supportDesc },
  ];

  const portfolioProjects = [
    {
      title: t.project1,
      description: t.project1Desc,
      image: "/images/portfolio_web_project_20251117_093614.png",
    },
    {
      title: t.project2,
      description: t.project2Desc,
      image: "/images/portfolio_mobile_app_20251117_093635.png",
    },
    {
      title: t.project3,
      description: t.project3Desc,
      image: "/images/portfolio_crm_system_20251117_093655.png",
    },
    {
      title: t.project4,
      description: t.project4Desc,
      image: "/images/portfolio_telegram_bot_20251117_093716.png",
    },
  ];
  // Framer motion variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };
  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header
          className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            isScrolled
              ? "bg-background/95 backdrop-blur-sm shadow-sm"
              : "bg-transparent"
          }`}
        >
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src="/public/images/logo.svg"
                  alt="Alchemit Logo"
                  className="w-full h-full object-cover bg-white"
                />
              </div>
              <span className="text-xl font-bold text-foreground">
                ALCHEMIT
              </span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("about")}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {t.about}
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {t.services}
              </button>

              <button
                onClick={() => scrollToSection("contacts")}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {t.contacts}
              </button>
              <button
                onClick={() => scrollToSection("address")}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {t.ourAddress}
              </button>
            </nav>

            {/* Language Switcher */}
            {/* Language Switcher */}
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full  shadow-sm bg-white"
                onClick={() => setIsOpen(!isOpen)}
              >
                <img
                  src={languages[currentLang].flag}
                  alt={currentLang}
                  className="w-6 h-6 rounded-full object-cover border-none outline-none ring-0"
                />
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg z-50 flex flex-col">
                  {(["en", "ru", "uz"] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setCurrentLang(lang);
                        setIsOpen(false);
                      }}
                      className={`flex items-center px-3 py-2 text-sm hover:bg-gray-100 ${
                        currentLang === lang ? "bg-primary/20" : ""
                      }`}
                    >
                      <img
                        src={languages[lang].flag}
                        alt={lang}
                        className="w-6 h-6 mr-2 rounded-full object-cover border-none outline-none ring-0"
                      />
                      {languages[lang].name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                    {t.heroTitle}
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {t.heroDescription}
                  </p>
                </div>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg animate-glow"
                  onClick={() => scrollToSection("contacts")}
                >
                  {t.contactUs}
                </Button>
              </div>
              <div className="relative">
                <img
                  src="/images/hero_illustration_20251117_093555.png"
                  alt="IT Solutions"
                  className="w-full h-auto animate-float"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 px-4 bg-secondary/30">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t.aboutTitle}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.aboutDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t.servicesTitle}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card
                    key={index}
                    className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-muted-foreground">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
        <section id="contacts" className="py-16 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {t.contactTitle}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t.contactDescription}
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                {/* <Card>
                  <CardHeader>
                    <CardTitle>{t.contactTitle}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <Input
                          placeholder={t.name}
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          placeholder={t.email}
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Textarea
                          placeholder={t.message}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          rows={5}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        {t.send}
                      </Button>
                    </form>
                  </CardContent>
                </Card> */}
                {/* Contact Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t.contactTitle}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleTelegramSubmit} className="space-y-6">
                      {/* Name */}
                      <Input
                        placeholder={t.name}
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />

                      {/* Email / Phone Toggle */}

                      <div className="flex items-center space-x-4 mb-2">
                        <div className="flex items-center bg-gray-200 rounded-full p-1 cursor-pointer">
                          <div
                            onClick={() => setContactType("email")}
                            className={`px-4 py-1 rounded-full transition-all ${
                              contactType === "email"
                                ? "bg-primary text-white"
                                : "text-muted-foreground"
                            }`}
                          >
                            {t.email}
                          </div>
                          <div
                            onClick={() => setContactType("phone")}
                            className={`px-4 py-1 rounded-full transition-all ${
                              contactType === "phone"
                                ? "bg-primary text-white"
                                : "text-muted-foreground"
                            }`}
                          >
                            {t.phone}
                          </div>
                        </div>
                      </div>

                      {/* Input field for Email or Phone */}
                      <div>
                        {contactType === "email" ? (
                          <Input
                            type="email"
                            placeholder="example@gmail.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            required
                          />
                        ) : (
                          <Input
                            type="tel"
                            placeholder="+998 90-123-45-67"
                            value={formData.phone}
                            onChange={(e) => {
                              const val = e.target.value;

                              let digits = val.replace(/\D/g, "");

                              if (digits.startsWith("998")) {
                                digits = digits.slice(3);
                              }

                              digits = digits.slice(0, 9);

                              let formatted = "";
                              if (digits.length > 0)
                                formatted = digits.slice(0, 2);
                              if (digits.length > 2)
                                formatted += "-" + digits.slice(2, 5);
                              if (digits.length > 5)
                                formatted += "-" + digits.slice(5, 7);
                              if (digits.length > 7)
                                formatted += "-" + digits.slice(7, 9);

                              const finalValue = `+998 ${formatted}`;

                              setFormData({ ...formData, phone: finalValue });
                            }}
                            required
                          />
                        )}
                      </div>

                      {/* Message */}
                      <Textarea
                        placeholder={t.message}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        rows={5}
                        required
                      />

                      {/* Submit */}
                      <Button type="submit" className="w-full">
                        {t.send}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <div className="space-y-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">Email</p>
                        {/* <p className="text-muted-foreground">info@alchemit.com</p> */}
                        <p className="text-muted-foreground">
                          <a
                            href="mailto:info@alchemit.com"
                            className="hover:underline"
                          >
                            info@alchemit.com
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">Телефон</p>
                        <a
                          href="tel:+998900097030"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          +998 90 009 70 30
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">Адрес</p>
                        <a
                          href="https://www.google.com/maps?q=88GQ%2BXW+Tashkent,+Uzbekistan"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          Uzbekistan, Tashkent улица Буюк Ипак Йули, 2
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Мы в соцсетях</h3>
                    <div className="flex space-x-4">
                      <Button variant="outline" size="lg" className="flex-1">
                        <MessageSquare className="w-5 h-5 mr-2" />
                        Telegram
                      </Button>
                      <Button variant="outline" size="lg" className="flex-1">
                        <Phone className="w-5 h-5 mr-2" />
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Map Section */}
        <section id="address" className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t.ourAddress}
              </h2>
              <p className="text-lg text-muted-foreground"></p>
            </div>
            <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                title="Alchemit Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.123456789!2d69.3397408!3d41.3274999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef4ab1234567%3A0xabcdef123456789!2s88GQ%2BXW,+Tashkent,+Uzbekistan!5e0!3m2!1sen!2s!4v1763444543300!5m2!1sen!2s"
                width="100%"
                height="100%"
                className="border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        {/* <section id="portfolio" className="py-16 px-4 bg-secondary/30">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {t.portfolioTitle}
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {portfolioProjects.map((project, index) => (
                  <Card
                    key={index}
                    className="group overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {t.viewProject}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section> */}
        {/* Contact Section */}

        {/* Footer */}
        <footer className="bg-foreground text-background py-8 px-4">
          <div className="container mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/logo.svg"
                    alt="Alchemit Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xl font-bold">ALCHEMIT</span>
              </div>
              <p className="text-background/70">{t.footerText}</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
