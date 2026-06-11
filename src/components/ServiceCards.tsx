import React from 'react';
import { Code, ShoppingCart, Share2, Brain, Lightbulb } from 'lucide-react';

// Define the structure of a service card
interface ServiceCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
}

// Individual service card component
const ServiceCard: React.FC<ServiceCardProps> = ({ title, subtitle, icon: Icon, description }) => {
  return (
    <div className="bg-darker-green/50 backdrop-blur-xl rounded-2xl p-8 hover:shadow-[0_0_30px_rgba(10,47,31,0.3)] transition-all transform hover:scale-[1.02] overflow-hidden relative group">
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-deep-green/5 rounded-full blur-xl group-hover:bg-deep-green/10 transition-all"></div>
      
      <div className="mb-6">
        <Icon className="w-10 h-10 text-deep-green mb-2" />
        <h3 className="text-2xl font-light font-heading text-white">
          {title}
          <span className="block text-lg font-light font-heading text-gray-400">{subtitle}</span>
        </h3>
      </div>
      
      <p className="text-gray-300 font-light font-dash">{description}</p>
    </div>
  );
};

export function ServiceCards() {
  // Service data array - easy to add or edit services
  const services = [
    {
      title: "Web & App",
      subtitle: "Development",
      description: "Custom solutions that combine stunning design with powerful functionality",
      icon: Code
    },
    {
      title: "AI & Machine",
      subtitle: "Learning",
      description: "Cutting-edge AI solutions that transform your business operations",
      icon: Brain
    },
    {
      title: "Digital",
      subtitle: "Strategy",
      description: "Comprehensive digital solutions that drive growth and innovation",
      icon: Lightbulb
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-deep-green/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-darker-green/20 blur-3xl rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light font-heading text-white mb-6">What we offer</h2>
          <div className="w-24 h-1 bg-deep-green mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              subtitle={service.subtitle}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
        
        {/* Service keywords section */}
        <div className="mt-24 relative">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              "UI/UX", "Video", "Web App", "CMS", 
              "Design", "Strategy", "Content", "Marketing", 
              "Website", "Research", "CRM"
            ].map((keyword, index) => (
              <div 
                key={index} 
                className="bg-deep-green/20 text-white px-6 py-3 rounded-full hover:bg-deep-green/30 transition-all transform hover:scale-105"
                style={{
                  transform: `rotate(${Math.random() * 6 - 3}deg)`,
                }}
              >
                {keyword}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 