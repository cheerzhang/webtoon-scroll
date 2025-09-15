import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';

interface WebtoonCardProps {
  id: string;
  title: string;
  description: string;
  coverImage: string;
}

const WebtoonCard = ({ id, title, description, coverImage }: WebtoonCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/read/${id}`);
  };

  return (
    <Card 
      className="bg-gradient-card border-border hover:bg-card-hover transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 overflow-hidden group"
      onClick={handleClick}
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img 
          src={coverImage} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2">{title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-3">{description}</p>
      </div>
    </Card>
  );
};

export default WebtoonCard;