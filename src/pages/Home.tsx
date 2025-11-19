import { useEffect, useState } from "react";
import Header from "@/components/Header";

const BASE_URL = import.meta.env.BASE_URL;
// Функция для создания правильного пути к файлу
const getAssetPath = (path: string) => {
  return BASE_URL + path.split('/').map(segment => encodeURIComponent(segment)).join('/');
};

const polina1Image = getAssetPath("img/polina1.jpg");
const polina2Image = getAssetPath("img/polina2.jpg");
const polina3Image = getAssetPath("img/polina5.jpg");

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const images = [
    { emoji: "🍔", label: "Что бы еЛОСЬ" },
    { emoji: "🍺", label: "Что б пиЛОСЬ" },
    { emoji: "✨", label: "Что б хотеЛОСЬ " },
    { emoji: "❤️", label: "Что б могЛОСЬ" },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-playfair font-bold text-foreground mb-8 sparkle">
            Полинка, с Днём Рождения!
          </h2>

          <div className="glass bg-gradient-to-br from-black via-gray-900 to-gray-800 border border-gray-700 rounded-3xl p-8 md:p-12 mb-12 glow-on-hover">
            <p className="text-lg md:text-xl text-black leading-relaxed font-medium">
              Пусть твои проблемы будут такими же временными, как мобильный интернет.
              <br />
              Желаю, чтобы количество кофе в твоей жизни всегда превышало количество задач.
              <br />
              Пусть каждый новый день будет хотя бы на 1% лучше вчерашнего это уже прогресс.
              <br />
              Помни если жизнь даёт тебе лимоны, забей на них хуй, отдохни вместо этого.
              <br />
              <span className="text-black font-semibold">Ты справляешься лучше, чем тебе  кажется </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="glass rounded-lg overflow-hidden glow-on-hover animate-float">
              <img 
                src={polina1Image} 
                alt="Полина" 
                className="w-full h-64 md:h-80 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="glass rounded-lg overflow-hidden glow-on-hover animate-float" style={{ animationDelay: "0.2s" }}>
              <img 
                src={polina2Image} 
                alt="Полина" 
                className="w-full h-64 md:h-80 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="glass rounded-lg overflow-hidden glow-on-hover animate-float mb-12" style={{ animationDelay: "0.4s" }}>
            <img 
              src={polina3Image} 
              alt="Полина" 
              className="w-full h-80 md:h-96 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {images.map((image, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-8 md:p-10 glow-on-hover animate-float"
                style={{ animationDelay: `${0.6 + index * 0.2}s` }}
              >
                <div className="text-6xl md:text-7xl mb-2">{image.emoji}</div>
                <p className="text-sm text-muted-foreground font-medium">{image.label}</p>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
            </div>
            <p className="relative text-sm text-muted-foreground font-light">
              Сияй, даже если все бесят
            </p>
          </div>
        </div>
      </main>

      <footer className="text-center py-8 text-muted-foreground text-sm">
        Сайт клепали бедные дети из индии, поэтому не судите строго
      </footer>
    </div>
  );
};

export default Home;
