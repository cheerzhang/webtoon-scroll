import WebtoonCard from '@/components/WebtoonCard';
import webtoonsData from '@/data/webtoons.json';

// Import cover images
import cover1 from '@/assets/cover1.jpg';
import cover2 from '@/assets/cover2.jpg';  
import cover3 from '@/assets/cover3.jpg';

const WebtoonHome = () => {
  // Map JSON paths to actual imported images
  const imageMap: Record<string, string> = {
    '/src/assets/cover1.jpg': cover1,
    '/src/assets/cover2.jpg': cover2,
    '/src/assets/cover3.jpg': cover3,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground">
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold text-center">My Webtoons</h1>
          <p className="text-center mt-2 text-primary-foreground/80">
            Discover amazing stories
          </p>
        </div>
      </header>

      {/* Webtoon Grid */}
      <main className="px-4 py-6">
        <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
          {webtoonsData.map((webtoon) => (
            <WebtoonCard
              key={webtoon.id}
              id={webtoon.id}
              title={webtoon.title}
              description={webtoon.description}
              coverImage={imageMap[webtoon.coverImage] || webtoon.coverImage}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default WebtoonHome;