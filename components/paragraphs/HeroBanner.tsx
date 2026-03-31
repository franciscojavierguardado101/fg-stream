interface HeroBannerProps {
  subtitle: string;
  body: string;
}

export default function HeroBanner({ subtitle, body }: HeroBannerProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl p-8 md:p-12 mb-8">
      <p className="text-lg md:text-xl font-semibold mb-4 text-blue-100">
        {subtitle}
      </p>
      <p className="text-base md:text-lg text-blue-50 leading-relaxed">
        {body}
      </p>
    </div>
  );
}
