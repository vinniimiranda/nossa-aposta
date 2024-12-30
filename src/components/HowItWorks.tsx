import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    number: 1,
    title: "Crie sua conta",
    description: "Registre-se gratuitamente em menos de um minuto.",
  },
  {
    number: 2,
    title: "Crie ou entre em um bolão",
    description: "Organize seu próprio bolão ou participe de um existente.",
  },
  {
    number: 3,
    title: "Faça suas apostas",
    description: "Escolha seus palpites para os jogos ou eventos.",
  },
  {
    number: 4,
    title: "Acompanhe e ganhe",
    description: "Veja os resultados em tempo real e ganhe prêmios!",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto">
        <h2 className="mb-12 text-center text-3xl font-bold">Como Funciona</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {step.number}
                  </span>
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>{step.description}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
