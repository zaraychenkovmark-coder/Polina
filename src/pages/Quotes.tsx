import { useEffect, useState } from "react";
import Header from "@/components/Header";

interface Quote {
  text: string;
  author: string;
}

const Quotes = () => {
  const [visibleQuotes, setVisibleQuotes] = useState<number[]>([]);

  const quotes: Quote[] = [
    {
      text: "На раз собрался - на два съебался",
      author: "Марк",
    },
    {
      text: "Кому награды и медали - кому то нихуя не дали",
      author: "Маркус",
    },
    {
      text: "Если не было бы разницы - хуй бы рос на заднице",
      author: "Марчело",
    },
    {
      text: "Ростом с елку - а хуле толку",
      author: "Маркус",
    },
    {
      text: "И не такие метели - в ебало летели",
      author: "Марсель",
    },
    {
      text: "Кому то коньяка бутылку - кому то хуем по затылку",
      author: "Марик",
    },
    {
      text: "Слепому не покажешь - долбаебу не докажешь",
      author: "Маркуша",
    },
    {
      text: "Нихуя себе струя - с комариного хуя",
      author: "Маркел",
    },
    {
      text: "Хуй в ладошку и в дорожку",
      author: "Марсианин",
    },
    {
      text: "Комбинация лица - охуели с утреца",
      author: "Маркон",
    },
    {
      text: "Дай дураку хуй стеклянный - он и хуй разобьет и руки порежет",
      author: "Мараканец",
    },
    {
      text: "Хороша ложка к супу - а к пизде залупу",
      author: "Марко",
    },
    {
      text: "То нога разуется - то пизда раздуется",
      author: "Маршал",
    },
    {
      text: "Широко шагаешь барыня - много на себя берешь так что пизду порвешь",
      author: "Марчино",
    },
    {
      text: "Как в уши нассать - так берет в оборот, как по делу сказать так хуев полон рот",
      author: "Марковка",
    },
    {
      text: "Как сахар съесть - так два куска, как на хуй сесть, пизда узка",
      author: "Маркуся",
    },
    {
      text: "Что сердцу натужно - то нахуй не нужно",
      author: "Маркель",
    },
    {
      text: "Щечки сдуй - и пиздуй",
      author: "Маркота",
    },
    {
      text: "В жизни все бывает - и рак свистит и хуй летает",
      author: "Мрак",
    },
    {
      text: "Нахуя козе гармонь - если рядом филармонь",
      author: "Стас, ой нет Марк",
    },
    {
      text: "Дураков ебать - только хуй ломать",
      author: "Маркинзи",
    },
    {
      text: "На ступеньках танцевали - на равнине хуй сломали",
      author: "Марканзас",
    },
    {
      text: "За хорошим ебуном - девки ходят табуном",
      author: "Маркуни",
    },
    {
      text: "Богатому пирожки да пышки - бедному хуй да шишки",
      author: "Маркозавр",
    },
    {
      text: "Ебала жаба гадюку - гадюка плакала а жаба квакала",
      author: "Марочка",
    },
    {
      text: "Извержение вулкана на залупе таракана",
      author: "Гандончик",
    },
    {
      text: "Кошка бросила котят - пусть ебуться как хотят",
      author: "Маркушка",
    },
    {
      text: "Хуй тебе на плечи - за такие речи",
      author: "Маркизон",
    },
    {
      text: "Таких друзей - на хуй и в музей",
      author: "Маркиан",
    },
    {
      text: "Ебал я вашу буровую - несите книжку трудовую",
      author: "Марасель",
    },
    {
      text: "То конь устал - то хуй не встал",
      author: "Маркинава",
    },
    {
      text: "Дайте в руки мне баян - разорву его к хуям",
      author: "Маракас",
    },
    {
      text: "В жарких спорах о культуре - оторвали хуй скульптуре",
      author: "Маркиня",
    },
    {
      text: "Ты как ветер переменчив - то хуеев то застенчив",
      author: "Маркин",
    },
    {
      text: "Нихуя себе дела - кошка мышку родила",
      author: "Маркоб",
    },
  ];

  useEffect(() => {
    quotes.forEach((_, index) => {
      setTimeout(() => {
        setVisibleQuotes((prev) => [...prev, index]);
      }, index * 300);
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
              Цитаты великих
            </h2>
            <p className="text-lg text-muted-foreground font-light">
              На каждый день  по мысли, которая вдохновляет
            </p>
          </div>

          <div className="space-y-6">
            {quotes.map((quote, index) => (
              <div
                key={index}
                className={`glass rounded-2xl p-6 md:p-8 glow-on-hover transition-all duration-700 ${
                  visibleQuotes.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-20"
                }`}
              >
                <blockquote className="text-lg md:text-xl text-foreground/90 mb-4 font-light italic leading-relaxed">
                  "{quote.text}"
                </blockquote>
                {quote.author && (
                  <p className="text-right text-primary font-medium">— {quote.author}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="text-center py-8 text-muted-foreground text-sm">
      Сайт клепали бедные дети из индии, поэтому не судите строго
      </footer>
    </div>
  );
};

export default Quotes;
