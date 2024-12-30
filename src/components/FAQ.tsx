import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como posso criar um bolão?",
    answer:
      "Para criar um bolão, basta fazer login na sua conta, clicar em 'Criar Bolão', definir as regras e convidar seus amigos.",
  },
  {
    question: "É seguro fazer pagamentos na plataforma?",
    answer:
      "Sim, utilizamos sistemas de pagamento criptografados e seguros para garantir a proteção de suas transações.",
  },
  {
    question: "Posso participar de múltiplos bolões ao mesmo tempo?",
    answer:
      "Absolutamente! Você pode participar de quantos bolões quiser simultaneamente.",
  },
  {
    question: "Como são distribuídos os prêmios?",
    answer:
      "Os prêmios são distribuídos automaticamente de acordo com as regras definidas em cada bolão, geralmente após a confirmação dos resultados oficiais.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Perguntas Frequentes
        </h2>
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full max-w-2xl"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
