import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import webtoonsData from '@/data/webtoons.json';

// 动态加载所有图片（只要路径包含 /src/assets/ 就可以）
const images = import.meta.glob('@/assets/**/*.{jpg,jpeg,png}', { eager: true });

const ComicReader = () => {
  const { id, episodeId } = useParams(); // 获取作品 ID 和章节 ID
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

  // 暂时只支持第一话 const currentEpisode = webtoon.episodes[0]; 
  const episodeIndex = episodeId ? parseInt(episodeId) - 1 : 0;
  const currentEpisode = webtoon.episodes[episodeIndex];

  if (!currentEpisode) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">❌ Episode Not Found</h1>
      </div>
    );
  }

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
            <p className="text-sm text-muted-foreground">Episode 1: {currentEpisode.title}</p>
          </div>
        </div>
      </div>

      {/* Comic Images */}
      <div className="max-w-2xl mx-auto px-4">
        {currentEpisode.images.map((imagePath: string, index: number) => {
          // 去掉开头的 "/src" 变成真实文件路径
          const cleanedPath = imagePath.replace(/^\/src/, '/src'); // for safety
          const imageModule = images[cleanedPath] as { default: string };

          if (!imageModule) {
            return (
              <div key={index} className="text-red-500 text-center">
                ❌ 找不到图片: {imagePath}
              </div>
            );
          }

          return (
            <div key={index} className="w-full">
              <img 
                src={imageModule.default}
                alt={`Page ${index + 1}`}
                className="w-full h-auto block mb-4"
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