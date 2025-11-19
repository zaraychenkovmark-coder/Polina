import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import { Play, Pause } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface Track {
  title: string;
  duration: string;
  cover: string;
  src?: string;
}

const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const BASE_URL = import.meta.env.BASE_URL;

// Функция для создания правильного пути к файлу
const getAssetPath = (path: string) => {
  return BASE_URL + path.split('/').map(segment => encodeURIComponent(segment)).join('/');
};

const Trap = () => {
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);
  const [loadedTrack, setLoadedTrack] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const tracks: Track[] = [
    { title: "Intro", duration: "0:00", cover: "I", src: getAssetPath("trap/intro.mp3") },
    { title: "Lizer - В жизни так бывает", duration: "0:00", cover: "L", src: getAssetPath("trap/Lizer - В жизни так бывает.mp3") },
    { title: "FACE - Расстояние", duration: "0:00", cover: "F", src: getAssetPath("trap/FACE - Расстояние.mp3") },
    { title: "Название излишне)", duration: "0:00", cover: "Н", src: getAssetPath("trap/Название излишне).mp3") },
    { title: "whole lotta swag - страгл", duration: "0:00", cover: "W", src: getAssetPath("trap/whole lotta swag - страгл.mp3") },
    { title: "Бонус", duration: "0:00", cover: "Б", src: getAssetPath("trap/Бонус.mp3") },
    { title: "Outro", duration: "0:00", cover: "O", src: getAssetPath("trap/Outro.mp3") },
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setPlayingTrack(null);
      setIsPlaying(false);
      setCurrentTime(0);
      setLoadedTrack(null);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingTrack !== null && tracks[playingTrack]?.src) {
      const trackSrc = tracks[playingTrack].src!;
      const currentSrc = audio.src.replace(window.location.origin, '');
      
      if (currentSrc !== trackSrc) {
        // Новый трек - загружаем с начала
        audio.src = trackSrc;
        setCurrentTime(0);
        setLoadedTrack(playingTrack);
        audio.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      } else {
        // Тот же трек - продолжаем с того же места
        setLoadedTrack(playingTrack);
        audio.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    } else {
      // Пауза - просто останавливаем, позиция сохраняется
      audio.pause();
    }
  }, [playingTrack]);

  const togglePlay = (index: number) => {
    if (playingTrack === index) {
      setPlayingTrack(null);
    } else {
      setPlayingTrack(index);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
              Отборный TRAP для Полинки
            </h2>
            <p className="text-lg text-muted-foreground font-light mb-6">
              Специальный плейлист на день рождения 🎧
            </p>
            <div className="flex justify-center mb-8">
              <img 
                src={getAssetPath("img/обложка.jpg")}
                alt="Обложка альбома" 
                className="w-full max-w-md rounded-2xl shadow-lg glow-on-hover"
              />
            </div>
          </div>

          <div className="space-y-4">
            {tracks.map((track, index) => (
              <div
                key={index}
                className={`glass rounded-2xl p-4 md:p-6 glow-on-hover transition-all duration-300 animate-slide-up ${
                  playingTrack === index ? "shadow-glow border-primary/40" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4 mb-3">
                  {/* Cover */}
                  <div
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300 ${
                      playingTrack === index
                        ? "ring-2 ring-primary animate-pulse"
                        : ""
                    }`}
                  >
                    <img 
                      src={getAssetPath("img/обложка.jpg")}
                      alt={track.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Track Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-medium text-foreground truncate">
                      {track.title}
                    </h3>
                    {loadedTrack === index ? (
                      <p className="text-sm text-muted-foreground">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">{track.duration}</p>
                    )}
                  </div>

                  {/* Play Button */}
                  <button
                    onClick={() => togglePlay(index)}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full glass hover:bg-primary/10 flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label={playingTrack === index ? "Pause" : "Play"}
                  >
                    {playingTrack === index ? (
                      <Pause className="text-primary" size={20} />
                    ) : (
                      <Play className="text-primary ml-1" size={20} />
                    )}
                  </button>
                </div>

                {/* Progress Slider */}
                {(playingTrack === index || loadedTrack === index) && (
                  <div className="mt-3">
                    <Slider
                      value={[currentTime]}
                      max={duration || 100}
                      step={0.1}
                      onValueChange={handleSeek}
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground font-light">
            Согласись это альбом года?
            </p>
          </div>
        </div>
      </main>

      <audio ref={audioRef} />

      <footer className="text-center py-8 text-muted-foreground text-sm">
        Сайт клепали бедные дети из индии, поэтому не судите строго
      </footer>
    </div>
  );
};

export default Trap;
