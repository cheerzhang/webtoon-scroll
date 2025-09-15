import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import webtoonsData from '@/data/webtoons.json';

// Import images statically for now (in production you'd load these dynamically)
import episode11 from '@/assets/episode1-1.jpg';
import episode12 from '@/assets/episode1-2.jpg';
import episode13 from '@/assets/episode1-3.jpg';

const ComicReader = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const webtoon = webtoonsData.find(w => w.id === id);

  if (!webtoon) {
    return (
      <div className="min-h-screen bg-reader-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Comic Not Found</h1>
          <Button onClick={() => navigate('/')} variant="secondary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  // For demo purposes, map to actual imported images
  const imageMap: Record<string, string> = {
    '/src/assets/episode1-1.jpg': episode11,
    '/src/assets/episode1-2.jpg': episode12,
    '/src/assets/episode1-3.jpg': episode13,
  };

  return (
    <div className="min-h-screen bg-reader-bg">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-3 flex items-center gap-3">
          <Button 
            onClick={() => navigate('/')} 
            variant="ghost" 
            size="sm"
            className="text-foreground hover:bg-secondary"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-semibold text-foreground">{webtoon.title}</h1>
            <p className="text-sm text-muted-foreground">Episode 1: {webtoon.episodes[0]?.title}</p>
          </div>
        </div>
      </div>

      {/* Comic Images */}
      <div className="max-w-2xl mx-auto">
        {webtoon.episodes[0]?.images.map((imagePath, index) => {
          const actualImage = imageMap[imagePath] || imagePath;
          return (
            <div key={index} className="w-full">
              <img 
                src={actualImage}
                alt={`Page ${index + 1}`}
                className="w-full h-auto block"
                loading={index > 0 ? 'lazy' : 'eager'}
              />
            </div>
          );
        })}
      </div>

      {/* End of Episode */}
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">End of Episode</p>
        <Button 
          onClick={() => navigate('/')}
          variant="secondary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default ComicReader;