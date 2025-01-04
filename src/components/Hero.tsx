import LotteryDialog from "./LotteryModal";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary to-[rgba(147,0,137,0.95)] text-white">
      <div className="relative h-full w-full py-16 text-center">
        <div className="relative z-10 flex flex-col items-center gap-6">
          <h1 className="text-5xl font-bold">
            Organize seu Bolão com Facilidade
          </h1>
          <p className="text-xl">
            Crie, gerencie e participe de bolões de forma simples e divertida!
          </p>
          <LotteryDialog text="Começar agora!" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col gap-8 overflow-hidden bg-[rgba(0,0,0,0.7)] py-6 opacity-75 bg-blend-soft-light">
          <div className="bg-banner animate-marquee bg-[auto_80%] bg-repeat-x px-2 pt-16 opacity-70"></div>
          <div className="bg-banner bg-position-70 animate-marquee-reverse bg-[auto_75%] bg-repeat-x pt-16 opacity-70"></div>
          <div className="bg-banner bg-position-20 animate-marquee bg-[auto_80%] bg-repeat-x pt-16 opacity-70"></div>
          <div className="bg-banner bg-0 animate-marquee-reverse bg-[auto_75%] bg-repeat-x pt-16 opacity-70"></div>
        </div>
      </div>
    </section>
  );
}
