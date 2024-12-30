import LotteryDialog from "./Bets";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary to-primary-foreground py-20 text-white">
      <div className="container mx-auto text-center">
        <h1 className="mb-4 text-5xl font-bold">
          Organize seu Bolão com Facilidade
        </h1>
        <p className="mb-8 text-xl">
          Crie, gerencie e participe de bolões de forma simples e divertida!
        </p>
        <LotteryDialog />
      </div>
    </section>
  );
}
