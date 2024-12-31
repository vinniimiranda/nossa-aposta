import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Trophy, Users } from "lucide-react";

const features = [
  {
    icon: <Trophy className="mb-2 h-8 w-8" />,
    title: "Competições Emocionantes",
    description: "Participe de bolões para diversos esportes e eventos.",
  },
  {
    icon: <Users className="mb-2 h-8 w-8" />,
    title: "Fácil Gerenciamento",
    description: "Crie e gerencie seus bolões com poucos cliques.",
  },
  {
    icon: <Shield className="mb-2 h-8 w-8" />,
    title: "Totalmente Legal",
    description: "Operamos de acordo com todas as regulamentações de apostas.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-muted py-20">
      <div className="container mx-auto">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Por que escolher o Minha Aposta!
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex flex-col items-center">
                  {feature.icon}
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                {feature.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
